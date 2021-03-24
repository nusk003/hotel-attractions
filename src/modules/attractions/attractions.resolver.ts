import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AttractionsService } from './attractions.service';
import { PlacesAdapter } from './attractions.adapter';
import {
  Place,
  Attractions,
  Hotel,
  CategoryPlace,
  Catalog,
} from './attractions.entity';
import { CreateAttraction, CreateHotelDto, UpdateAttractionArgs } from './dto';
import { categories } from './data';

@Resolver()
export class AttractionsResolver {
  private placesService: PlacesAdapter;
  constructor(private attractionsService: AttractionsService) {
    this.placesService = new PlacesAdapter();
  }
  @Query(() => Attractions)
  async getAttractions(@Args('hotel_id') hotel_id: string) {
    return this.attractionsService.getAttractionByHotel(hotel_id);
  }
  @Mutation(() => Hotel)
  async createHotel(@Args('input') createAttractionsDto: CreateHotelDto) {
    return this.attractionsService.createHotel(createAttractionsDto);
  }

  @Query(() => [Hotel])
  async getHotels() {
    return this.attractionsService.getHotels();
  }

  @Query(() => Hotel)
  async getHotel(@Args('id') id: string) {
    return this.attractionsService.getHotel(id);
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

  // @Mutation(() => CategoryDto)
  // async addKeywordToCategory(
  //   @Args('categoryName') categoryName: string,
  //   @Args('keywords') keyword: string,
  // ) {
  //   const category = await this.attractionsService.getCategory({
  //     name: categoryName,
  //   });
  //   let keywords = [...category.keywords];
  //   if (typeof keyword === 'string') {
  //     keywords.push(keyword);
  //   }

  //   // if (typeof keyword === 'object') {
  //   //   keywords = keywords.concat(keyword);
  //   // }

  //   return this.attractionsService.updateCategory(categoryName, { keywords });
  // }

  // @Query(() => [AutoCompleteDto])
  // async getAutocomplete(@Args('query') query: string) {
  //   return this.placesService.getPlacesAutoComplete(query);
  // }

  @Query(() => Place)
  async getPlaceDetails(@Args('place_id') place_id: string) {
    return this.placesService.getPlaceDetails(place_id);
  }

  @Mutation(() => Attractions)
  async updateAttractions(@Args() updateAttractionArgs: UpdateAttractionArgs) {}

  // @Mutation(() => AttractionsDto)
  // async addCustomAttraction(
  //   @Args('hotel_id') hotel_id: string,
  //   @Args('category') categoryName: string,
  // ) {
  //   const attraction = await this.attractionsService.getAttractions(hotel_id);
  // }

  // @Mutation(() => AttractionsDto)
  // async updateAttractions(
  //   @Args('place_id') place_id: string,
  //   @Args('hotel_id') hotel_id: string,
  //   @Args('category') categoryName: string,
  //   @Args('note') note: string,
  // ) {
  //   const attraction = await this.attractionsService.getAttractions(hotel_id);
  //   const categories = [...attraction.catalog.categories];
  //   const index = categories.findIndex(
  //     (category) => category.category.name === categoryName,
  //   );
  //   if (index > -1) {
  //     const category = categories[index];
  //     const places = category.places;
  //     const placeIndex = places.findIndex((place) => place.id === place_id);

  //     if (placeIndex > -1) {
  //       const place = places[placeIndex];
  //       const notes = [...place.notes];
  //       notes.push(note);
  //       place.notes = notes;
  //       attraction.catalog.categories = categories;

  //       return this.attractionsService.updateAttractions(hotel_id, {
  //         catalog: attraction.catalog,
  //       });
  //     }
  //   }
  // }

  @Query(() => Attractions)
  async getAttractionsByHotel(@Args('hotelId') hotelId: string) {
    return this.attractionsService.getAttractionByHotel(hotelId);
  }

  @Mutation(() => Attractions)
  async generateAttractions(@Args('hotel_id') hotelId: string) {
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

    // await this.attractionsService.updateAttraction(attraction);

    return attraction;
  }
}
