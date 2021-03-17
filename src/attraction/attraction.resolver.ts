import { Resolver, Query, ResolveField, Args, Mutation } from '@nestjs/graphql';
import { Attraction } from './attraction.model';
import { AttractionService } from './attraction.service';
import { CreateAttractionDto } from './dto/create-attraction-dto';
import { CreateAttrationInput } from './InputTypes/create-attraction-input';

@Resolver()
export class AttractionResolver {
  constructor(private attractionService: AttractionService) {}

  @Mutation(() => Attraction)
  async createAttraction(@Args('input') input: CreateAttrationInput) {
    return this.attractionService.create(input);
  }

  @Query((returns) => [Attraction])
  async findAll() {
    return this.attractionService.findAll();
  }
}
