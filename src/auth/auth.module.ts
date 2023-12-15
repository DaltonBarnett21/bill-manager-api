import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
