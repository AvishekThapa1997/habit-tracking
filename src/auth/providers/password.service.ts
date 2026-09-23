import { AppConfigService } from '@/config/config.service.js';
import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(@Inject() private readonly appConfigService: AppConfigService) {}

  async hashPassword(plainPassword: string) {
    return bcrypt.hash(
      plainPassword,
      this.appConfigService.get('BCRYPT_ROUNDS'),
    );
  }
  async comparePasswords(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
