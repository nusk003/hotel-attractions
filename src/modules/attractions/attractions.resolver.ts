import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AttractionsService } from './attractions.service';
import { PlacesAdapter } from './attractions.adapter';
import {
  Place,
  Attractions,
  Hotel,
  CategoryPlace,
  Catalog,
  AutoComplete,
} from './attractions.entity';
import {
  HotelInput,
  UpdateAttractionArgs,
  HotelInputArgs,
  SearchInputArgs,
  PlaceInputArgs,
} from './dto';
import { categories } from './data';

@Resolver()
export class AttractionsResolver {
  private placesService: PlacesAdapter;
  constructor(private attractionsService: AttractionsService) {
    this.placesService = new PlacesAdapter();
  }
  @Query(() => Attractions)
  async getAttractions(@Args() { hotelId }: HotelInputArgs) {
    return this.attractionsService.getAttractionByHotel(hotelId);
  }
  @Mutation(() => Hotel)
  async createHotel(@Args() createHotel: HotelInput) {
    return this.attractionsService.createHotel(createHotel);
  }

  @Query(() => [Hotel])
  async getHotels() {
    return this.attractionsService.getHotels();
  }

  @Query(() => Hotel)
  async getHotel(@Args() { hotelId }: HotelInputArgs) {
    return this.attractionsService.getHotel(hotelId);
  }

  // @Mutation(() => AttractionsDto)
  // async generateAttractions(@Args('hotel_id') hotel: string) {
  //   const attraction = await this.attractionsService.getAttractions(hotel);
  //   const getPlaces = await this.placesService.getPlacesByCordinate(
  //     attraction.hotel.coordinate,
  //   );

  //   const categoryPlaces: CategoryPlaceDto[] = this.placesService.covertResultsToAttractionPlaces(
  //     getPlaces.results,
  //   );

  //   const catalog = await this.attractionsService.getOrCreateCatalog({
  //     name: 'Default Catalog',
  //     categories: categoryPlaces,
  //   });

  //   console.log(catalog);

  //   const update = this.attractionsService.updateAttractions(hotel, {
  //     catalog,
  //   });

  //   return update;
  // }

  @Query(() => [AutoComplete])
  async searchPlaces(@Args() { query }: SearchInputArgs) {
    return this.placesService.getPlacesAutoComplete(query);
  }

  @Query(() => Place)
  async getPlacebyPlaceID(@Args() { placeId }: PlaceInputArgs) {
    return this.placesService.getPlaceDetails(placeId);
  }

  @Mutation(() => Attractions)
  async updateAttractions(
    @Args() { hotelId, categories }: UpdateAttractionArgs,
  ): Promise<Attractions> {
    const attraction = await this.attractionsService.getAttractionByHotel(
      hotelId,
    );
    attraction.catalog.categories = categories;
    await this.attractionsService.updateAttraction(attraction);
    return attraction;
  }

  @Query(() => Attractions)
  async getAttractionsByHotel(@Args() { hotelId }: HotelInputArgs) {
    return this.attractionsService.getAttractionByHotel(hotelId);
  }

  @Mutation(() => Attractions)
  async generateAttractions(@Args() { hotelId }: HotelInputArgs) {
    const hotel = await this.attractionsService.getHotel(hotelId);
    const categoryPlaces: CategoryPlace[] = await this.placesService.getPlacesByCategories(
      hotel.coordinate,
      categories,
    );

    const catalog: Catalog = {
      name: 'Default Catalog',
      categories: categoryPlaces,
    };

    let attraction = await this.attractionsService.getAttractionByHotel(
      hotel.id,
    );

    if (attraction !== null) {
      attraction.catalog = catalog;
      await this.attractionsService.updateAttraction(attraction);
    } else {
      attraction = await this.attractionsService.createAttraction({
        hotel: hotel,
        catalog,
      });
    }

    return attraction;
  }
}
