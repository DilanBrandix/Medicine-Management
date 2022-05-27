import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  addUser(@Body() user: any) {
    return this.usersService.findUser(user);
  }
}
