import { InputType, Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coordinate {
  @Field(() => Float)
  readonly latitude: number;
  @Field(() => Float)
  readonly longitude: number;
}

@InputType()
export class CoordinateInput {
  @Field(() => Float)
  readonly latitude: number;
  @Field(() => Float)
  readonly longitude: number;
}
