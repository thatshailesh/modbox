import { HttpModule, HttpService } from "@nestjs/axios"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { AxiosResponse } from 'axios';
import { of } from "rxjs";
import { AppService } from "./app.service"
import { BenfordStockComparisonDto } from "./dto/benford-stock-comparison.dto";
import { StockHistoricalDataApiDto } from "./dto/stock-historical-data-api.dto";
import { StockHistoricalDataDto } from "./dto/stock-historical-data.dto";
import { getDigitsFrequencies } from "./util";

describe('AppService', () => {
    let appService: AppService
    let httpService: HttpService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule, ConfigModule.forRoot()],
            providers: [
                AppService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn((key: string) => {
                            if (key === 'YH_RAPID_API_URL') {
                                return 'http://rapidfoo.com/stocks/v3'
                            }
                            if (key === 'RAPID_API_KEY') {
                                return 'supersecretkey'
                            }
                            return null
                        })
                    }
                }
            ],
        }).compile();
        appService = module.get<AppService>(AppService)
        httpService = module.get<HttpService>(HttpService)
    })

    it('should be defined', () => {
        expect(appService).toBeDefined()
    })
    describe('Stock historical data', () => {
        const mockHistoricalData = {
            date: 1630330200,
            open: 75.14800262451172,
            high: 76.96800231933594,
            low: 74.29000091552734,
            close: 76.69000244140625,
            volume: 7979900,
            adjclose: 74.8027114868164
        }
        it('should return historical trading data of a given stock', async () => {
            const mockResult: AxiosResponse<StockHistoricalDataApiDto> = {
                data: {
                    prices: [mockHistoricalData],
                    isPending: false,
                    id: '',
                    firstTradeDate: 1400765400
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            }
            jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mockResult))
            const result = await appService.getHistoricalStockData('JD')
            expect(result).toEqual(mockResult)
        })
    })

    describe('Benford law comparison', () => {
        it('should provide benford law comparison of trading volumes', async () => {
            const mockResult: BenfordStockComparisonDto[] = [
                {
                    "leadingDigit": 1,
                    "occurenceCount": 1,
                    "occurencePercent": "33.333 %",
                    "comparisonToBL": "3.233 %"
                },
                {
                    "leadingDigit": 2,
                    "occurenceCount": 1,
                    "occurencePercent": "33.333 %",
                    "comparisonToBL": "15.733 %"
                },
                {
                    "leadingDigit": 3,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-12.500 %"
                },
                {
                    "leadingDigit": 4,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-9.700 %"
                },
                {
                    "leadingDigit": 5,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-7.900 %"
                },
                {
                    "leadingDigit": 6,
                    "occurenceCount": 1,
                    "occurencePercent": "33.333 %",
                    "comparisonToBL": "26.633 %"
                },
                {
                    "leadingDigit": 7,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-5.800 %"
                },
                {
                    "leadingDigit": 8,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-5.100 %"
                },
                {
                    "leadingDigit": 9,
                    "occurenceCount": 0,
                    "occurencePercent": "0.000 %",
                    "comparisonToBL": "-4.600 %"
                }
            ]
            const mockHistoricalData = [{
                date: 1654867800,
                open: 3.119999885559082,
                high: 3.4200000762939453,
                low: 3.0999999046325684,
                close: 3.2200000286102295,
                volume: 298000,
                adjclose: 3.2200000286102295
            }, {
                date: 1654781400,
                open: 3.9000000953674316,
                high: 3.950000047683716,
                low: 3.3499999046325684,
                close: 3.359999895095825,
                volume: 663000,
                adjclose: 3.359999895095825
            }, {
                date: 1654695000,
                open: 6.5,
                high: 6.5,
                low: 4.010000228881836,
                close: 4.059999942779541,
                volume: 1920100,
                adjclose: 4.059999942779541
            }]
            const mockApiData: AxiosResponse<StockHistoricalDataApiDto> = {
                data: {
                    prices: mockHistoricalData,
                    isPending: false,
                    id: '',
                    firstTradeDate: 1654695000
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
            }
            jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mockApiData))
            const result = await appService.evaluateBenfordData('TOP')
            expect(result).toEqual(mockResult)
        })
    })

    describe('Utils', () => {
        it('should be able to count the frequencies of digits', () => {
            const input = ['2', '6', '1']
            const expectedResult = [
                0, 1, 1, 0, 0,
                0, 1, 0, 0, 0
              ]
            const result = getDigitsFrequencies(input)
            expect(result).toEqual(expectedResult)
        })
    })
})