import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { Hotel, HotelSchema } from './hotel.schema';
import { HotelController } from './hotel.controller';
// import { Attraction as AttractionModel } from 'src/attraction/attraction.model';

@Module({
  controllers: [HotelController],
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelService, HotelResolver],
})
export class HotelModule {}
