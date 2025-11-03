import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly HistoryService: HistoryService) {}
  @Get()
  getHistory(): any {
    return this.HistoryService.getHistory();
  }
  @Get('/:id')
  getHistoryById(@Param('id') id: string): any {
    return this.HistoryService.getHistoryById(Number(id));
  }
  @Post('/:id')
  postHistory(@Param('id') id: string, @Body() body: any): any {
    return this.HistoryService.createHistory(body, Number(id));
  }
  @Delete('/:id/:campo/:idCampo')
  putHistory(
    @Param('id') id: string,
    @Param('campo') campo: string,
    @Param('idCampo') idCampo: string,
  ) {
    return this.HistoryService.deleteHistory(
      Number(id),
      campo,
      Number(idCampo),
    );
  }
}
