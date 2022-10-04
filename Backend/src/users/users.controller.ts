import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserPost } from './model/user.interface';
import { UsersService } from './users.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  addUser(@Body() user: any) {
    return this.usersService.findUser(user);
  }
  @Post('create')
  create(@Body() userpost: UserPost): Observable<UserPost> {
    return this.usersService.createUser(userpost);
  }
  @Get()
  findAll(): Observable<UserPost[]> {
    return this.usersService.findAll();
  }
  @Delete('delete/:id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.usersService.deleteUser(id);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userPost: UserPost,
  ): Observable<UpdateResult> {
    return this.usersService.updateUser(id, userPost);
  }
  @Get('user/:id')
  getByUsername(@Param('id') id: number): Promise<any> {
    return this.usersService.getByUsername(id);
  }
}
