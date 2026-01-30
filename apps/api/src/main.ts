import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // 쿠키 파서 사용

  const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) =>
    origin.trim(),
  ) ?? ['http://localhost:3000', 'https://emotion-trade-mate-web.vercel.app'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');
  return app;
}

// Local Development
if (!process.env.VERCEL) {
  (async () => {
    const app = await bootstrap();
    await app.listen(process.env.PORT ?? 4000);
    console.log(`Server is running on port ${process.env.PORT ?? 4000}`);
  })();
}

// Vercel Serverless Function
export default async function (req: any, res: any) {
  const app = await bootstrap();
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
