import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
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
  @Put()
  putUser(@Body() body: User): any {
    return this.UsersService.putUser(body);
  }
  @Delete(`/:dni`)
  deleteUser(@Param(`dni`) dni: string): any {
    return this.UsersService.deleteUser(Number(dni));
  }
}
