import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { TurnosService } from './turnos.service';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly TurnosService: TurnosService) {}
  @Get()
  getTurnos(): any {
    return this.TurnosService.getTurno();
  }
  @Post()
  postTurno(@Body() body: any): any {
    return this.TurnosService.createTurno(body);
  }
  @Delete('/:id')
  deleteTurno(@Param('id') id: string): any {
    return this.TurnosService.deleteTurno(Number(id));
  }
}
