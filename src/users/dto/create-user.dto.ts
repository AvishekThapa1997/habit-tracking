import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto.js';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

