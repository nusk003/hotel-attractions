import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';
import { Coordinate } from 'src/helper/dto';
import { groupByArray } from 'src/helper/functions';

import { Place, Category, CategoryPlace } from './attractions.entity';

export class PlacesAdapter {
  client: Client;
  private key: string;
  constructor() {
    this.client = new Client({});
    this.key = 'AIzaSyCBAfZCHkLTv5teXFKrzlnUBDcMyxhHuoU';
  }

  async getPlacesByCordinate(
    { latitude, longitude }: Coordinate,
    category: string = undefined,
  ) {
    const places = await this.client.placesNearby({
      params: {
        key: this.key,
        location: `${latitude},${longitude}`,
        radius: 1500,
        type: category,
        // rankby : "prominence"
      },
      method: 'GET',
    });

    return places.data;
  }

  convertResponseDataToPlace = (responseData: any): Place => {
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
      coordinate: {
        latitude: lat,
        longitude: lng,
      },
      notes: [],
      photos: images,
    };
  };

  async getPlacesAutoComplete(input: string) {
    const results = await this.client.placeAutocomplete({
      params: {
        input,
        key: this.key,
        types: PlaceAutocompleteType.establishment,
      },
    });

    return results.data.predictions;
  }

  convertAutoCompleteToPlaceDto({
    formatted_address,
    place_id,
    name,
    geometry,
  }: any): Place {
    const { lat, lng } = geometry.location;
    return {
      address: formatted_address,
      id: place_id,
      name,
      notes: [],
      coordinate: {
        latitude: lat,
        longitude: lng,
      },
      photos: [],
    };
  }

  async getPlaceDetails(place_id: string) {
    const result = await this.client.placeDetails({
      params: {
        key: this.key,
        place_id,
      },
    });

    return this.convertAutoCompleteToPlaceDto(result.data.result);
  }

  async getPlacesByCategories(
    coordinate: Coordinate,
    categories: Category[],
  ): Promise<CategoryPlace[]> {
    const categoryPlaces: CategoryPlace[] = [];
    for (let category of categories) {
      const { keywords, name } = category;
      const places: Place[] = [];
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

  covertResultsToAttractionPlaces(results): CategoryPlace[] {
    const categoryPlaces: CategoryPlace[] = [];
    const groupByCategory = groupByArray(results, (a) => a.types[0]);
    // console.log(groupByCategory);
    Object.keys(groupByCategory).map((key) => {
      const placeResults = groupByCategory[key];
      const places: Place[] = [];
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
