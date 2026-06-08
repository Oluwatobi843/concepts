import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Post } from './posts/entities/post.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { FileUploadModule } from './file-upload/file-upload.module';
import { UploadFile } from './file-upload/entities/file.entity';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
 

// root module -> use all the sub modules

@Module({

  

  imports: [

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5
      }
    ]),

    CacheModule.register({
      isGlobal: true,
      ttl: 30000,
      max: 100
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'youtube-nestjs-project',
      entities: [Post, User, UploadFile], // array of entities that you want to register
      synchronize: true, // dev mode
    }),

    ConfigModule.forRoot({
      isGlobal: true, // make configmodule globally available
      // validationSchema : joi.object({
      //   APP_NAME: joi.string().default('defaultApp'),

      // })

      load: [appConfig],
    }),

    HelloModule,
    UserModule,
    PostsModule,
    AuthModule,
    FileUploadModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    // apply the middleware for all the routes
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
