import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // forRootAsync ensures that this will be executed once all the configuration files were loaded
      // by using forRootAsync we can not to worry about the order of loading operations
      useFactory: () => ({
        type: 'postgres', // type of our database
        host: process.env.DATABASE_HOST, // database host
        port: +process.env.DATABASE_PORT, // database host
        username: process.env.DATABASE_USER, // username
        password: process.env.DATABASE_PASSWORD, // user password
        database: process.env.DATABASE_NAME, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: false, // your entities will be synced with the database(recommended: disable in prod)
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: '.environment', // default .env at root. Also, an array of strings is possible
      ignoreEnvFile: false, // set to true if your env vars come from UI provider (heroku, etc)
      validationSchema: Joi.object({
        // default: all schema keys are optional
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
