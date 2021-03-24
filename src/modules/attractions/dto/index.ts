import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { Coordinate, CoordinateInput } from 'src/helper/dto';
import {
  CategoryPlace,
  Hotel,
  Catalog,
  Category,
  Place,
} from '../attractions.entity';

@InputType()
@ArgsType()
export class HotelInput {
  @Field()
  name: string;

  @Field(() => CoordinateInput)
  coordinate: CoordinateInput;
}

@InputType()
export class CreateAttraction {
  @Field(() => Hotel)
  hotel: Hotel;

  @Field({ nullable: true })
  catalog: Catalog;
}

@InputType()
export class CreateCatalogDto {
  @Field()
  name: string;

  @Field(() => [CategoryPlace])
  categories: CategoryPlace[];
}

@InputType()
export class PlaceInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [String])
  notes: string[];

  @Field(() => CoordinateInput)
  coordinate: CoordinateInput;

  @Field(() => [String])
  photos: string[];
}

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field(() => [String])
  keywords: string[];
}

@InputType()
export class CategoryPlaceInput {
  @Field(() => CategoryInput)
  category: CategoryInput;

  @Field(() => [PlaceInput])
  places: PlaceInput[];
}

@ArgsType()
export class UpdateAttractionArgs {
  @Field()
  hotelId: string;

  @Field(() => [CategoryPlaceInput])
  categories: CategoryPlaceInput[];
}

@ArgsType()
export class HotelInputArgs {
  @Field()
  hotelId: string;
}

@ArgsType()
export class PlaceInputArgs {
  @Field()
  placeId: string;
}

@ArgsType()
export class SearchInputArgs {
  @Field()
  query: string;
}
