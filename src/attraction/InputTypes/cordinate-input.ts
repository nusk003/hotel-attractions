import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CordinateInput {
  @Field(() => Float)
  readonly lat: number;

  @Field(() => Float)
  readonly lon: number;
}
