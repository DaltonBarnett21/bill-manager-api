import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BillModule } from './bill/bill.module';
import { DateService } from './common/date/date.service';

@Module({
  imports: [AuthModule, UsersModule, BillModule, DateService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
