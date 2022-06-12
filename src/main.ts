import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Befords law API')
    .setDescription('Stock trading volume distribution using benfords law')
    .setVersion('1.0')
    .addTag('benford')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
