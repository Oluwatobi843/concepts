import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';


// root module -> use all the sub modules



@Module({
  imports: [ 
    
    ConfigModule.forRoot({
      isGlobal: true, // make configmodule globally available
    }),
    
    HelloModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
