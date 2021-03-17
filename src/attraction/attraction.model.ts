import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Attraction {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field((type) => String)
  formatted_address: string;
}
