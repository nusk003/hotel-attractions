import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttrationInput {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly formatted_address: string;
}
