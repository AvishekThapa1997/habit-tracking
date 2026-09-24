import { CreateUserDto } from '@/users/dto/create-user.dto.js';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import type { AuthRequest } from './types/index.js';
import { Auth, Public, UserId } from './decorators/auth.decorator.js';
import { UserDto } from '@/users/dto/user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async register(
    @Body() createUserDto: CreateUserDto,
    @Req() req: AuthRequest,
  ) {
    const user = await this.authService.register(createUserDto);
    req.session.userId = user.id;
    return user;
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(@Body() loginDto: LoginDto, @Req() req: AuthRequest) {
    const user = await this.authService.login(loginDto);
    req.session.userId = user.id;
    return user;
  }

  @Get('/session')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async getSession(@UserId() userId: UserDto['id']) {
    const user = await this.authService.getSession(userId);
    return user;
  }
}
