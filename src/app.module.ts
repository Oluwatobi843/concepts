import { Module } from '@nestjs/common';
import { Post } from './posts/entities/post.entity'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/enitities/user.entity';

// root module -> use all the sub modules

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'youtube-nestjs-project',
      entities: [Post, User], // array of entities that you want to register
      synchronize: true, // dev mode
    }),

    ConfigModule.forRoot({
      isGlobal: true, // make configmodule globally available
      // validationSchema : joi.object({
      //   APP_NAME: joi.string().default('defaultApp'),

      // })

      load : [appConfig],
    }),

    HelloModule,
    UserModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
