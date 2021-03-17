import { Module } from '@nestjs/common';
import { AttractionController } from './attraction.controller';
import { AttractionService } from './attraction.service';
import { AttractionResolver } from './attraction.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Attraction, AttractionSchema } from './attraction.schema';
import { GoogleMapsService } from 'src/googleMaps/google_maps.service';

@Module({
  controllers: [AttractionController],
  imports: [
    MongooseModule.forFeature([
      { name: Attraction.name, schema: AttractionSchema },
    ]),
  ],
  providers: [AttractionService, AttractionResolver, GoogleMapsService],
})
export class AttractionModule {}
