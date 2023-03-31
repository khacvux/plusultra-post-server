import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: process.env.GATEWAY_HOST,
    credentials: true,
  });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
