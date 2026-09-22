import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto.js';
export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
