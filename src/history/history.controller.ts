import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    return this.HistoryService.updateHistory(body, Number(id));
  }
}
