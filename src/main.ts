import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';


// root file -> entry port  of ur nest js application


async function bootstrap() {
  const logger  = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','debug','log','verbose']
  });

  // validating incoming requests bodies automatically
  app.useGlobalPipes(

    new ValidationPipe({
      whitelist: true, // strips properties that dont have decorators
      forbidNonWhitelisted: true,
      transform: true, // automatically transform payloads to be objects typed according  to their dto classes 
      disableErrorMessages: false
    })
  )

  // global settings

  app.useGlobalInterceptors(new LoggingInterceptor());
  // env

  // start a http server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
