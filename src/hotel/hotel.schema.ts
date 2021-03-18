import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Attraction } from 'src/attraction/attraction.model';
import { Float } from '@nestjs/graphql';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop(() => Float)
  lat: number;

  @Prop(() => Float)
  lon: number;

  @Prop(() => [String])
  attractions: String[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
