import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { BenfordStockComparisonDto } from './dto/benford-stock-comparison.dto';

@ApiTags('benford')
@Controller('benford')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Hello world!',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('benford-data/:stock')
  @ApiResponse({
    status: 200,
    description: 'Benfords law stock comparison API',
    type: BenfordStockComparisonDto,
  })
  public getBenfordData(
    @Param('stock') stock: string
  ) {
    return this.appService.evaluateBenfordData(stock)
  }
}
