import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Coordinate } from 'src/helper/dto';
import {
  Entity,
  PrimaryKey,
  Property,
  OneToOne,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from 'mongodb';

@Entity({ tableName: 'hotel' })
@ObjectType()
export class Hotel {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  @Field()
  readonly id: string;

  @Property()
  @Field()
  name: string;

  @Property()
  @Field(() => Coordinate)
  coordinate: Coordinate;
}

@ObjectType()
export class Place {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => [String])
  notes: string[];

  @Field()
  coordinate: Coordinate;

  @Field(() => [String])
  photos: string[];
}

@ObjectType()
export class AutoComplete {
  @Field()
  place_id: string;

  @Field()
  description: string;
}

@ObjectType()
export class Category {
  @Field()
  name: string;

  @Field(() => [String])
  keywords: string[];
}

@ObjectType()
export class CategoryPlace {
  @Field()
  category: Category;

  @Field(() => [Place])
  places: Place[];
}

@ObjectType()
export class Catalog {
  @Field(() => [CategoryPlace])
  categories: CategoryPlace[];

  @Field()
  name: string;
}

@Entity({ tableName: 'attractions' })
@ObjectType()
export class Attractions {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  @Field()
  id: string;

  @OneToOne('Hotel')
  @Field()
  hotel: Hotel;

  @Property()
  @Field()
  name: String;

  @Property()
  @Field(() => Catalog, { nullable: true })
  catalog: Catalog;
}
