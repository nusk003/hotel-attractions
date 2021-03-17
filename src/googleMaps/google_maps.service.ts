import { Client } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';

@Injectable()
export class GoogleMapsService {
  client: Client;

  constructor() {
    this.client = new Client({});
  }

  async getPlacesByCordinate(
    @Args('lat') lat: number,
    @Args('lon') lon: number,
  ) {
    const places = await this.client.placesNearby({
      params: {
        key: 'AIzaSyCBAfZCHkLTv5teXFKrzlnUBDcMyxhHuoU',
        location: `${lat},${lon}`,
        radius: 1500,
      },
      method: 'GET',
    });

    return places.data;
  }
}
