import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordUtil } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;
    const isValidPassWord = await comparePasswordUtil(password, user.password);
    if (!isValidPassWord) return null;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
        isActive: user.isActive,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return this.usersService.register(registerDto);
  }

  async checkCode(data: CodeAuthDto) {
    return await this.usersService.handleActive(data);
  }

  async retryActive(email: string) {
    return await this.usersService.handleRetryActive(email);
  }

  async retryPassword(email: string) {
    return await this.usersService.handleRetryPassword(email);
  }

  async changePassword(data: ChangePasswordAuthDto) {
    return await this.usersService.handleChangePassword(data);
  }
}
