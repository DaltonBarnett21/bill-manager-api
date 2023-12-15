import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(email, pass) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: await this.createAccessToken(payload),
      refresh_token: await this.createRefreshToken(payload),
      name: user.name,
      email: user.email,
    };
  }

  public async verifyToken(token) {
    try {
      this.jwtService.verify(token, { secret: jwtConstants.secret });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async createAccessToken(payload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '15 minutes',
    });
  }

  private async createRefreshToken(payload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: '7 days',
    });
  }

  public async decodeToken(token) {
    return this.jwtService.decode(token);
  }

  public async register(user) {
    try {
      const existingUser = await this.usersService.findOne(user.email);

      if (existingUser) {
        throw new ConflictException();
      }
      return await this.usersService.create({ ...user });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
