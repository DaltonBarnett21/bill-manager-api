import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { PrismaModule } from 'src/db/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

import { DateModule } from 'src/common/date/date.module';

@Module({
  imports: [PrismaModule, AuthModule, DateModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
