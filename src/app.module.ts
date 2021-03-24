import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AttractionsModule } from './modules/attractions/attractions.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroORMConfig } from './config/mikr-orm-config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MikroOrmModule.forRoot(mikroORMConfig()),

    AttractionsModule,
  ],
})
export class AppModule {}
