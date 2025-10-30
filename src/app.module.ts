import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';
import { TurnosController } from './turnos/turnos.controller';
import { TurnosService } from './turnos/turnos.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    PetsController,
    TurnosController,
    HistoryController,
  ],
  providers: [AppService, UsersService, PetsService, TurnosService, HistoryService],
})
export class AppModule {}
