require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import axios from 'axios';
import { Request, Response } from '@nestjs/common';

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

  const webhookUrl = process.env.APP_URL + 'actions/webhook';
  const interval = 1000 * 60 * 5; // 5 minutes

  const makeApiCall = async () => {
    try {
      const response = await axios.get(webhookUrl);
      console.log(`Status Code: ${response.status}, Message: ${response.data.message}`);
    } catch (error) {
      console.error('Error during webhook call:', error);
    }
  };

  makeApiCall();

  setInterval(makeApiCall, interval);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
