import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import * as joi from 'joi';
import appConfig from './config/app.config';


// root module -> use all the sub modules



@Module({
  imports: [ 
    
    ConfigModule.forRoot({
      isGlobal: true, // make configmodule globally available
      // validationSchema : joi.object({
      //   APP_NAME: joi.string().default('defaultApp'),

      // })

      load : [appConfig],
    }),
    
    HelloModule, UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
