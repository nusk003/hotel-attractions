import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field(() => Float)
  readonly lat: number;

  @Field(() => Float)
  readonly lon: number;
}
