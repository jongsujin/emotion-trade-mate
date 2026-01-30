import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

export default async function (req, res) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
