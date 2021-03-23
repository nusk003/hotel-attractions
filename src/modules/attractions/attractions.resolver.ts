import { Resolver, Query, Args, Mutation, ResolveField } from '@nestjs/graphql';
import { AttractionsService } from './attractions.service';
import {
  CreateAttractionsDto,
  AttractionsDto,
  PlaceDto,
  CategoryPlaceDto,
  CreateCategoryDto,
  CategoryDto,
  AutoCompleteDto,
} from './dto';
import { PlacesAdapter } from './attractions.adapter';

@Resolver()
export class AttractionsResolver {
  private placesService: PlacesAdapter;
  constructor(private attractionsService: AttractionsService) {
    this.placesService = new PlacesAdapter();
  }
  @Query(() => AttractionsDto)
  async getAttractions(@Args('hotel_id') hotel_id: string) {
    return this.attractionsService.getAttractions(hotel_id);
  }
  @Mutation(() => AttractionsDto)
  async createHotel(@Args('input') createAttractionsDto: CreateAttractionsDto) {
    return this.attractionsService.createAttractions(createAttractionsDto);
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('input') createCategoryDto: CreateCategoryDto) {
    return this.attractionsService.createCategory(createCategoryDto);
  }

  @Query(() => [CategoryDto])
  async getCategories() {
    return this.attractionsService.getCategories();
  }

  @Mutation(() => AttractionsDto)
  async generateAttractions(@Args('hotel_id') hotel: string) {
    const attraction = await this.attractionsService.getAttractions(hotel);
    const getPlaces = await this.placesService.getPlacesByCordinate(
      attraction.hotel.coordinate,
    );

    const categoryPlaces: CategoryPlaceDto[] = this.placesService.covertResultsToAttractionPlaces(
      getPlaces.results,
    );

    const catalog = await this.attractionsService.getOrCreateCatalog({
      name: 'Default Catalog',
      categories: categoryPlaces,
    });

    console.log(catalog);

    const update = this.attractionsService.updateAttractions(hotel, {
      catalog,
    });

    return update;
  }

  @Mutation(() => CategoryDto)
  async addKeywordToCategory(
    @Args('categoryName') categoryName: string,
    @Args('keywords') keyword: string,
  ) {
    const category = await this.attractionsService.getCategory({
      name: categoryName,
    });
    let keywords = [...category.keywords];
    if (typeof keyword === 'string') {
      keywords.push(keyword);
    }

    // if (typeof keyword === 'object') {
    //   keywords = keywords.concat(keyword);
    // }

    return this.attractionsService.updateCategory(categoryName, { keywords });
  }

  @Query(() => [AutoCompleteDto])
  async getAutocomplete(@Args('query') query: string) {
    return this.placesService.getPlacesAutoComplete(query);
  }

  @Query(() => PlaceDto)
  async getPlaceDetails(@Args('place_id') place_id: string) {
    return this.placesService.getPlaceDetails(place_id);
  }

  @Mutation(() => AttractionsDto)
  async addCustomAttraction(
    @Args('hotel_id') hotel_id: string,
    @Args('category') categoryName: string,
  ) {
    const attraction = await this.attractionsService.getAttractions(hotel_id);
  }

  @Mutation(() => AttractionsDto)
  async updateAttractions(
    @Args('place_id') place_id: string,
    @Args('hotel_id') hotel_id: string,
    @Args('category') categoryName: string,
    @Args('note') note: string,
  ) {
    const attraction = await this.attractionsService.getAttractions(hotel_id);
    const categories = [...attraction.catalog.categories];
    const index = categories.findIndex(
      (category) => category.category.name === categoryName,
    );
    if (index > -1) {
      const category = categories[index];
      const places = category.places;
      const placeIndex = places.findIndex((place) => place.id === place_id);

      if (placeIndex > -1) {
        const place = places[placeIndex];
        const notes = [...place.notes];
        notes.push(note);
        place.notes = notes;
        attraction.catalog.categories = categories;

        return this.attractionsService.updateAttractions(hotel_id, {
          catalog: attraction.catalog,
        });
      }
    }
  }

  @Mutation(() => AttractionsDto)
  async generateAttractionsM2(@Args('hotel_id') hotel: string) {
    const attraction = await this.attractionsService.getAttractions(hotel);
    const categories = await this.getCategories();
    const categoriesDto: CategoryDto[] = [];
    for (let { name, keywords } of categories) {
      categoriesDto.push({
        name,
        keywords,
      });
    }
    const categoryPlaces: CategoryPlaceDto[] = await this.placesService.getPlacesByCategories(
      attraction.hotel.coordinate,
      categoriesDto,
    );

    const catalog = await this.attractionsService.getOrCreateCatalog({
      name: 'Default Catalog',
      categories: categoryPlaces,
    });

    console.log(catalog);

    const update = this.attractionsService.updateAttractions(hotel, {
      catalog,
    });

    return update;
  }
}
