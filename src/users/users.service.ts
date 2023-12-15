import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async create(user: User): Promise<undefined> {
    return this.prisma.user.create({
      data: {
        ...user,
      },
    }) as any;
  }

  public async delete(id: string): Promise<any> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
