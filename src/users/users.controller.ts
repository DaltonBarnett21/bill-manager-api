import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
