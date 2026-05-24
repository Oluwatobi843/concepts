import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import * as joi from 'joi';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';


// root module -> use all the sub modules



@Module({
  imports: [ 

    TypeOrmModule.forRoot({

        type : 'postgress',
        host : 'localhost',
        port : 5432,
        username : 'postgress',
        password : 'root',
        database : 'youtube-nestjs-project',
        
    }),
    
    // ConfigModule.forRoot({
    //   isGlobal: true, // make configmodule globally available
    //   // validationSchema : joi.object({
    //   //   APP_NAME: joi.string().default('defaultApp'),

    //   // })

    //   load : [appConfig],
    // }),
    
    HelloModule, UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
