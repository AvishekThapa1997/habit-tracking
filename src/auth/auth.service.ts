import { AppConfigService } from '@/config/config.service.js';
import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject() private readonly appConfigService: AppConfigService) {}

  async hashPassword(plainPassword: string) {
    const BCRYPT_ROUNDS = this.appConfigService.get('BCRYPT_ROUNDS');
    return bcrypt.hash(plainPassword, BCRYPT_ROUNDS);
  }
  async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
