import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/benford-data (GET) benford stock comparison', () => {
    return request(app.getHttpServer())
    .get('/benford-data/PEV')
    .expect(({body}) => {
      const expectedResult = [
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
      expect(body).toEqual(expectedResult)
    })
    
  })
});
