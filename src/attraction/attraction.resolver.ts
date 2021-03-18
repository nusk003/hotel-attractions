import { Resolver, Query, ResolveField, Args, Mutation } from '@nestjs/graphql';
import { Attraction } from './attraction.model';
import { AttractionService } from './attraction.service';
import { CreateAttractionDto } from './dto/create-attraction-dto';
import { CreateAttrationInput } from './InputTypes/create-attraction-input';
import { GoogleMapsService } from 'src/googleMaps/google_maps.service';
import { CordinateInput } from './InputTypes/cordinate-input';

@Resolver()
export class AttractionResolver {
  constructor(
    private attractionService: AttractionService,
    private googleMapService: GoogleMapsService,
  ) {}

  @Mutation(() => Attraction)
  async createAttraction(@Args('input') input: CreateAttrationInput) {
    return this.attractionService.create(input);
  }

  @Query((returns) => [Attraction])
  async getAttractions() {
    return this.attractionService.findAll();
  }

  @Query((returns) => [Attraction])
  async getAttractionsByCordinates(
    @Args('cordinate') { lat, lon }: CordinateInput,
  ) {
    const places = await this.googleMapService.getPlacesByCordinate(lat, lon);
    const attractions: Attraction[] = [];
    for (let { place_id, vicinity, name } of places.results) {
      const attraction = await this.attractionService.getOrCreateAttraction({
        id: place_id,
        name,
        formatted_address: vicinity,
      });
      attractions.push(attraction);
    }
    return attractions;
  }
}
