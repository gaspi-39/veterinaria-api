import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no existen en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades desconocidas
      transform: true, // convierte automáticamente los tipos (string → number, etc.)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
