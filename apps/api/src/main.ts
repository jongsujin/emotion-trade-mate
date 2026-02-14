import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // 쿠키 파서 사용
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const allowedOrigins = [
    'http://localhost:3000',
    'https://emotion-trade-mate-web.vercel.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
}
void bootstrap();
