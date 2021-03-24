import { InputType, Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class Coordinate {
  @Field(() => Float)
  readonly latitude: number;
  @Field(() => Float)
  readonly longitude: number;
}
