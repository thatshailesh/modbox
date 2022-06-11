import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('benford-data/:stock')
  public getBenfordData(
    @Param('stock') stock: string
  ) {
    return this.appService.evaluateBenfordData(stock)
  }
}
