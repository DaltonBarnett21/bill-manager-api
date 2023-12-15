import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() login: AuthDto) {
    return this.authService.login(login.email, login.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public register(@Body() registerDto: Record<string, any>) {
    return this.authService.register({
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  public async refresh(@Body() body: { refresh_token: string }) {
    const isValid = await this.authService.verifyToken(body.refresh_token);
    let newAccessToken;

    if (!isValid) {
      throw new ForbiddenException('invalid refresh token!');
    }

    try {
      const decodedRefreshToken = await this.authService.decodeToken(
        body.refresh_token,
      );

      const payload = {
        sub: decodedRefreshToken.sub,
        name: decodedRefreshToken.name,
      };
      newAccessToken = await this.authService.createAccessToken(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return {
      access_token: newAccessToken,
    };
  }

  @UseGuards(AuthGuard)
  @Get('test')
  public getProfile() {
    return {
      test: 'hello from test!',
    };
  }
}
