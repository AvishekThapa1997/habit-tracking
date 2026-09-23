import { AuthService } from '@/auth/auth.service.js';
import { PasswordService } from '@/auth/providers/password.service.js';
import { InjectDb } from '@/db/db.decorator.js';
import type { Db } from '@/db/db.module.js';
import { entries } from '@/db/schema/entries.js';
import { habitTags } from '@/db/schema/habits-tags.js';
import { habits } from '@/db/schema/habits.js';
import { tags } from '@/db/schema/tags.js';
import { users } from '@/db/schema/users.js';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    @InjectDb() private readonly db: Db,
    @Inject() private readonly passwordService: PasswordService,
  ) {}

  async seed() {
    Logger.log('🌱 Starting database seed...');

    try {
      // Step 1: Clear existing data (order matters!)
      Logger.log('Clearing existing data...');
      const db = this.db;
      await db.delete(entries); // Delete entries first (foreign keys)
      await db.delete(habitTags); // Delete junction table
      await db.delete(habits); // Delete habits
      await db.delete(tags); // Delete tags
      await db.delete(users); // Delete users last

      // Step 2: Create foundation data
      Logger.log('Creating demo users...');
      const hashedPassword = await this.passwordService.hashPassword('demo123');

      const [demoUser] = await db
        .insert(users)
        .values({
          email: 'demo@habittracker.com',
          userName: 'demouser',
          password: hashedPassword,
          firstName: 'Demo',
          lastName: 'User',
        })
        .returning();

      // Step 3: Create tags for categorization
      Logger.log('Creating tags...');
      const [healthTag] = await db
        .insert(tags)
        .values({ name: 'Health', color: '#10B981' })
        .returning();

      const [productivityTag] = await db
        .insert(tags)
        .values({ name: 'Productivity', color: '#3B82F6' })
        .returning();

      // Step 4: Create habits with relationships
      Logger.log('Creating demo habits...');
      const [exerciseHabit] = await db
        .insert(habits)
        .values({
          userId: demoUser.id,
          name: 'Exercise',
          description: 'Daily workout routine',
          frequency: 'daily',
          targetCount: 1,
        })
        .returning();

      // Step 5: Create many-to-many relationships
      await db
        .insert(habitTags)
        .values([{ habitId: exerciseHabit.id, tagId: healthTag.id }]);

      // Step 6: Create historical completion data
      Logger.log('Adding completion entries...');
      const today = new Date();
      today.setHours(12, 0, 0, 0);

      // Exercise habit - completions for past 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        await db.insert(entries).values({
          habitId: exerciseHabit.id,
          completetionDate: date,
          note: i === 0 ? 'Great workout today!' : null,
        });
      }

      // Step 7: Test relational queries
      Logger.log('\n🔍 Testing relational queries...');
      const userWithHabits = await db.query.users.findFirst({
        where: { email: 'demo@habittracker.com' },
        with: {
          habits: {
            with: {
              entries: true,
              habitTags: {
                with: {
                  tag: true,
                },
              },
            },
          },
        },
      });

      Logger.log('✅ Database seeded successfully!');
      Logger.log('\n📊 Seed Summary:');
      Logger.log(
        `- Demo user has ${userWithHabits?.habits.length || 0} habits`,
      );
      Logger.log('\n🔑 Login Credentials:');
      Logger.log('Email: demo@habittracker.com');
      Logger.log('Password: demo123');
    } catch (error) {
      Logger.error('❌ Seed failed:', error);
      throw error;
    }
  }
}
