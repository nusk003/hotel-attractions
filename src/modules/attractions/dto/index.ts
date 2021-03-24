import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { Coordinate } from 'src/helper/dto';
import { CategoryPlace, Hotel, Catalog, Category } from '../attractions.entity';

@InputType()
export class CreateHotelDto {
  @Field()
  name: string;

  @Field(() => Coordinate)
  coordinate: Coordinate;
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

@ArgsType()
export class UpdateAttractionArgs {
  @Field()
  hotelId: string;

  @Field(() => [CategoryPlace])
  categories: CategoryPlace[];
}
