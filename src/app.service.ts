import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'
import { StockHistoricalDataApiDto } from './dto/stock-historical-data-api.dto'
import { getDigitsFrequencies } from './util'
import { BenfordStockComparisonDto } from './dto/benford-stock-comparison.dto'
import { StockHistoricalDataDto } from './dto/stock-historical-data.dto'

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}
  getHello(): string {
    return 'Hello World!'
  }

  public async getHistoricalStockData(stock: string): Promise<AxiosResponse<StockHistoricalDataApiDto>> {
    const yahooFinanceRapiAPIUrl = this.configService.get('YH_RAPID_API_URL')
    const rapidAPIKey = this.configService.get('RAPID_API_KEY')
    return lastValueFrom(await this.httpService.get<StockHistoricalDataApiDto>(
      `${yahooFinanceRapiAPIUrl}/get-historical-data`,
      {
        headers: {
          'X-RapidAPI-Key': rapidAPIKey,
        },
        params: {
          symbol: stock,
          region: 'US'
        }
      }
    )) 
  }

  public async evaluateBenfordData(stock: string): Promise<BenfordStockComparisonDto[]> {
    const { data } = await this.getHistoricalStockData(stock)
    const { prices } = data
    const result = []

    //                               1      2      3      4      5      6      7      8      9
    const BenfordPercentages = [0, 0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046]
    const tradingVolumes = prices.filter(tradingData => tradingData.volume)

    const firstDigitsOfVolume = tradingVolumes.map((item: StockHistoricalDataDto) => {
      return item.volume.toString()[0]
    })
    
    const firstDigitFrequencies = getDigitsFrequencies(firstDigitsOfVolume)

    for(let n = 1; n <= 9; n++){
      const resultObj = {
        leadingDigit: n,
        occurenceCount: 0,
        occurencePercent: '',
        comparisonToBL: ''
      }
      
      const occurenceCount = firstDigitFrequencies[n]
      const occurence = occurenceCount / prices.length
      resultObj.occurenceCount = occurenceCount
      resultObj.occurencePercent = `${(occurence * 100).toFixed(3) } %`

      const BenfordFrequency = BenfordPercentages[n]
      resultObj.comparisonToBL = `${((occurence - BenfordFrequency) * 100).toFixed(3) } %`
      result.push(resultObj)
    }

    return result

  }

}
