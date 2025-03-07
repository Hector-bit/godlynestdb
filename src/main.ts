import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // When you pass a type to the NestFactory.create() method, as in the example below, the app object will have methods available exclusively for that specific platform. Note, however, you don't need to specify a type unless you actually want to access the underlying platform API.
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
