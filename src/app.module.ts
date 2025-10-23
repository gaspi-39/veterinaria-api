import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PetsController],
  providers: [AppService, UsersService, PetsService],
})
export class AppModule {}
