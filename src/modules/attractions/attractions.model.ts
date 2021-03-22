import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { PlaceDto, Hotel, CategoryPlaceDto, CatalogDto } from './dto';

// export type PlaceDocument = Place & Document;

// export class Place {
//   @Prop()
//   id: string;

//   @Prop()
//   name: string;

//   @Prop()
//   address: string;

//   @Prop(() => [String])
//   notes: string[];
// }

// export const PlaceSchema = SchemaFactory.createForClass(Place);

// export class Hotel {
//   @Prop()
//   readonly id: string;

//   @Prop()
//   readonly name: string;

//   @Prop()
//   readonly coordinate: Coordinate;
// }

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop(() => [String])
  keywords: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @Prop(() => [CategoryPlaceDto])
  categories: CategoryPlaceDto[];

  @Prop()
  name: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);

export type AttractionsDocument = Attractions & Document;

@Schema()
export class Attractions {
  @Prop(() => Hotel)
  hotel: Hotel;

  @Prop(() => CatalogDto)
  catalog: CatalogDto;

  @Prop()
  test: string;
}

export const AttractionsSchema = SchemaFactory.createForClass(Attractions);
