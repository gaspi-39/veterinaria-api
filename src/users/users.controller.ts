import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get()
  getUsers(): any {
    return this.UsersService.getUsers();
  }
  @Post()
  postUser(@Body() body: User): any {
    return this.UsersService.createUser(body);
  }
}
