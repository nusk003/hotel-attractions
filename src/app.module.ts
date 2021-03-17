import { Module } from '@nestjs/common';
import { AttractionModule } from './attraction/attraction.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://nusky:Amb1UKMlUCoTCG8n@cluster0.cn9ki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AttractionModule,
  ],
})
export class AppModule {}
