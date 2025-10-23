import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from 'src/models/pets.models';

@Controller('pets')
export class PetsController {
  constructor(private readonly PetsService: PetsService) {}
  @Get()
  getUsers(): any {
    return this.PetsService.getPets();
  }
  @Post()
  postUser(@Body() body: Pet): any {
    return this.PetsService.createPet(body);
  }
  @Put()
  putUser(@Body() body: Pet): any {
    return this.PetsService.putPet(body);
  }
  @Delete(`/:id`)
  deleteUser(@Param(`id`) id: string): any {
    return this.PetsService.deletePet(Number(id));
  }
}
