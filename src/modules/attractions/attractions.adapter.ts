import {
  Client,
  PlaceDetailsRequest,
} from '@googlemaps/google-maps-services-js';
import { Coordinate } from 'src/helper/dto';
import { groupByArray } from 'src/helper/functions';
import { PlaceDto, CategoryPlaceDto, CategoryDto } from './dto';

export class PlacesAdapter {
  client: Client;

  constructor() {
    this.client = new Client({});
  }

  async getPlacesByCordinate(
    { latitude, longitude }: Coordinate,
    category: string = undefined,
  ) {
    const places = await this.client.placesNearby({
      params: {
        key: 'AIzaSyCBAfZCHkLTv5teXFKrzlnUBDcMyxhHuoU',
        location: `${latitude},${longitude}`,
        radius: 1500,
        type: category,
      },
      method: 'GET',
    });

    return places.data;
  }

  convertResponseDataToPlace = (responseData: any): PlaceDto => {
    const { name, place_id, vicinity, geometry, photos } = responseData;
    const { lat, lng } = geometry.location;
    const images: string[] = [];
    if (photos) {
      for (let photo of photos) {
        images.push(photo.photo_reference);
      }
    }

    return {
      name,
      id: place_id,
      address: vicinity,
      cordinate: {
        latitude: lat,
        longitude: lng,
      },
      notes: [],
      photos: images,
    };
  };

  async getPlacesAutoComplete() {}

  async getPlacesByCategories(
    coordinate: Coordinate,
    categories: CategoryDto[],
  ): Promise<CategoryPlaceDto[]> {
    const categoryPlaces: CategoryPlaceDto[] = [];
    for (let category of categories) {
      const { keywords, name } = category;
      const places: PlaceDto[] = [];
      console.log(keywords);
      for (let keyword of keywords) {
        const placesResults = await this.getPlacesByCordinate(
          coordinate,
          keyword,
        );
        for (let placeResult of placesResults.results) {
          places.push(this.convertResponseDataToPlace(placeResult));
        }
      }

      categoryPlaces.push({
        category: {
          name,
          keywords,
        },
        places,
      });
    }
    return categoryPlaces;
  }

  covertResultsToAttractionPlaces(results): CategoryPlaceDto[] {
    const categoryPlaces: CategoryPlaceDto[] = [];
    const groupByCategory = groupByArray(results, (a) => a.types[0]);
    // console.log(groupByCategory);
    Object.keys(groupByCategory).map((key) => {
      const placeResults = groupByCategory[key];
      const places: PlaceDto[] = [];
      placeResults.map((placeResult) => {
        places.push(this.convertResponseDataToPlace(placeResult));
      });

      categoryPlaces.push({
        category: {
          name: key,
          keywords: [key],
        },
        places,
      });
    });

    return categoryPlaces;
  }
}
