import { Resolver, Query, ResolveField, Args, Mutation } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import { CreateHotelInput } from './InputTypes/create-hotel.input';
import { CreateHotelDto } from './dto/create-hotel-dto';
import { AttractionService } from 'src/attraction/attraction.service';
// import { AttractionService } from 'src/attraction/attraction.service';

@Resolver()
export class HotelResolver {
  constructor(
    private attractionService: AttractionService,
    private hotelService: HotelService, // private attractionService: AttractionService,
  ) {}

  @Mutation(() => Hotel)
  async createHotel(@Args('input') input: CreateHotelInput) {
    return this.hotelService.create(input);
  }

  @Query((returns) => [Hotel])
  async getHotels() {
    return this.hotelService.findAll();
  }

  @Query((returns) => Hotel)
  async getHotel(@Args('id') id: string) {
    return this.hotelService.findById(id);
  }

  //   @Mutation((returns) => Hotel)
  //   async updateHotel(
  //     @Args('id') id: string,
  //     @Args('updatedAttrs') updatedAttrs: any,
  //   ) {
  //     return this.hotelService.updateHotel(id, updatedAttrs);
  //   }

  //   @Mutation((returns) => Hotel)
  //   async createAttractionsForHotel(@Args('hotel_id') id: string) {
  //     const hotel = await this.hotelService.findById(id);
  //     const { lat, lon } = hotel;
  //     const attractions = await this.attractionService.findByCordinates(lat, lon);
  //     hotel.attractions = attractions;
  //     const updatedHotel = await this.hotelService.updateHotel(id, {
  //       attractions,
  //     });

  //     return updatedHotel;
  //   }
}
