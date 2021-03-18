import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
// import { Attraction } from 'src/attraction/attraction.model';

@ObjectType()
export class Hotel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;

  @Field(() => [String])
  attractions: String[];
}
