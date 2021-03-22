import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Coordinate {
  @Prop()
  lattitude: number;
  @Prop()
  longitude: number;
}
