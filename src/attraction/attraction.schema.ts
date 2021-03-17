import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttractionDocument = Attraction & Document;

@Schema()
export class Attraction {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  formatted_address: string;
}

export const AttractionSchema = SchemaFactory.createForClass(Attraction);
