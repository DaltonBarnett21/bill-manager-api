import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApiNoContentResponse } from '@nestjs/swagger';
import { Bill } from '@prisma/client';
import { DateService } from 'src/common/date/date.service';
import { valueToBoolean } from 'src/common/valueToBoolean';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class BillService {
  constructor(
    private prisma: PrismaService,
    private dateService: DateService,
  ) {}

  public async create(bill) {
    try {
      await this.prisma.bill.create({
        data: {
          ...bill,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getAll(userId: string, isPaid: string) {
    const isPaidParsed = valueToBoolean(isPaid);
    let bills = [];
    try {
      if (isPaid) {
        bills = await this.prisma.bill.findMany({
          where: {
            userId: userId,
            isPaid: isPaidParsed,
          },
        });
      } else {
        bills = await this.prisma.bill.findMany({
          where: {
            userId: userId,
          },
        });
      }

      if (!bills) {
        return ApiNoContentResponse();
      }

      const sortedResponse = bills.sort((a: Bill, b: Bill) => {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      });
      return sortedResponse;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getBill({ userId, billId }) {
    try {
      return this.prisma.bill.findFirst({
        where: {
          userId: userId,
          id: billId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async updateBill({ billId, userId, isPaid, note, amount, billName }) {
    try {
      return await this.prisma.bill.update({
        where: {
          id: billId,
          userId: userId,
        },
        data: {
          isPaid: isPaid,
          note: note,
          amount: amount,
          billName: billName,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
