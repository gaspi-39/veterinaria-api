import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';
import { TurnosController } from './turnos/turnos.controller';
import { TurnosService } from './turnos/turnos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    PetsController,
    TurnosController,
  ],
  providers: [AppService, UsersService, PetsService, TurnosService],
})
export class AppModule {}
