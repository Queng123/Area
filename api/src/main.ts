require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Area-API')
    .setDescription('The Area-API is a RESTful API that allows you to manage the Epitech ARea project.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const webhookUrl = process.env.APP_URL + 'webhook/';
  const intervalFiveMinutes = 1000 * 60 * 5; // 5 minutes
  const intervalDay = 1000 * 60 * 60 * 24; // 24 hours

  const makeApiCall = async (time: string) => {
    try {
      const response = await axios.get(webhookUrl + time);
      console.log(`${response.data} with url ${webhookUrl + time}`);
    } catch (error) {
      console.error('Error during webhook call:', error);
    }
  };

  makeApiCall("five-minutes");
  makeApiCall("one-day");

  setInterval(() => makeApiCall("five-minutes"), intervalFiveMinutes);
  setInterval(() => makeApiCall("one-day"), intervalDay);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
