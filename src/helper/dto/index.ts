import { InputType, Field, Float, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateCoordinateInput {
  @Field(() => Float)
  readonly latitude: number;
  @Field(() => Float)
  readonly longitude: number;
}

@ObjectType()
export class Coordinate {
  @Field(() => Float)
  readonly latitude: number;
  @Field(() => Float)
  readonly longitude: number;
}
