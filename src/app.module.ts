import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AttractionsModule } from './modules/attractions/attractions.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://nusky:Amb1UKMlUCoTCG8n@cluster0.cn9ki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AttractionsModule,
  ],
})
export class AppModule {}
