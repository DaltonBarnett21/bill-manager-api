import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { BillService } from './bill.service';

@Controller('bills')
export class BillController {
  constructor(
    private authService: AuthService,
    private billService: BillService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  public createBill(@Request() req) {
    const bill = {
      userId: req.user.sub,
      ...req.body,
    };
    this.billService.create(bill);
  }

  @UseGuards(AuthGuard)
  @Get()
  public getBills(@Request() req) {
    return this.billService.getAll(req.user.sub, req.query.isPaid);
  }

  @UseGuards(AuthGuard)
  @Get(':billId')
  public getBill(@Request() req, @Param() params) {
    return this.billService.getBill({
      billId: params.billId,
      userId: req.user.sub,
    });
  }

  @UseGuards(AuthGuard)
  @Put(':billId')
  public updateBill(@Request() req, @Param() params) {
    return this.billService.updateBill({
      billId: params.billId,
      userId: req.user.sub,
      isPaid: req.body.isPaid,
      note: req.body.note,
      amount: req.body.amount,
      billName: req.body.billName,
    });
  }
}
