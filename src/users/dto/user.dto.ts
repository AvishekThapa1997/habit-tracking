import type { User } from '@/db/types/index.js';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserDto implements Omit<User, 'password'> {
  @IsInt()
  id: number;

  @IsString()
  @Length(3, 30)
  userName: string;

  @IsString()
  @IsOptional()
  firstName: string | null;

  @IsString()
  @IsOptional()
  lastName: string | null;

  @IsEmail()
  @IsString()
  email: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.userName = user.userName;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }
  }

  static fromDomain(user: User): UserDto {
    return new UserDto(user);
  }
}
