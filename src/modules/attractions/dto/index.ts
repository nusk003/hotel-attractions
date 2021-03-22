import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { IsOptional, IsObject, IsDefined } from 'class-validator';
import { Coordinate, CreateCoordinateInput } from 'src/helper/dto';

@ObjectType()
export class Hotel {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field(() => Coordinate)
  readonly coordinate: Coordinate;
}

@ObjectType()
export class PlaceDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [String])
  notes: string[];

  @Field()
  cordinate: Coordinate;

  @Field(() => [String])
  photos: string[];
}

@ObjectType()
export class CategoryDto {
  @Field()
  name: string;

  @Field(() => [String])
  keywords: string[];
}

@ObjectType()
export class CategoryPlaceDto {
  @Field()
  category: CategoryDto;

  @Field(() => [PlaceDto])
  places: PlaceDto[];
}

@ObjectType()
export class CatalogDto {
  @Field(() => [CategoryPlaceDto], { nullable: true })
  categories: CategoryPlaceDto[];

  @Field()
  name: string;
}

@ObjectType()
export class AttractionsDto {
  @Field()
  _id: string;
  @Field()
  hotel: Hotel;

  @Field()
  name: String;

  @Field(() => CatalogDto, { nullable: true })
  catalog: CatalogDto;
}

@InputType()
export class CreateCategoryDto {
  @Field()
  readonly name: string;
  @Field(() => [String])
  readonly keywords: string[];
}

@InputType()
export class CreateHotelDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => CreateCoordinateInput)
  coordinate: CreateCoordinateInput;
}

@InputType()
export class CreateAttractionsDto {
  @Field(() => CreateHotelDto)
  readonly hotel: CreateHotelDto;
  // readonly name: String;
}

@InputType()
export class CreateCatalogDto {
  @Field()
  name: string;

  @Field(() => [CategoryPlaceDto])
  categories: CategoryPlaceDto[];
}
