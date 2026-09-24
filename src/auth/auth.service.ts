import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NeonDbError } from '@neondatabase/serverless';
import { InjectDb } from '@/db/db.decorator.js';
import type { Db } from '@/db/db.module.js';
import { users } from '@/db/schema/users.js';
import { PasswordService } from './providers/password.service.js';
import { CreateUserDto } from '@/users/dto/create-user.dto.js';
import { UserDto } from '@/users/dto/user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { eq } from 'drizzle-orm';
import { UserSession } from './types/index.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: Db,
    private readonly passwordService: PasswordService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        createUserDto.password,
      );
      const [newUser] = await this.db
        .insert(users)
        .values({
          userName: createUserDto.userName,
          email: createUserDto.email,
          password: hashedPassword,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
        })
        .returning();

      return UserDto.fromDomain(newUser);
    } catch (error) {
      if (error instanceof NeonDbError) {
        throw new BadRequestException('Invalid registration details');
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<UserDto> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, loginDto.email))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return UserDto.fromDomain(user);
  }

  async getSession(userId?: UserDto['id']): Promise<UserDto> {
    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return UserDto.fromDomain(user);
  }
}
