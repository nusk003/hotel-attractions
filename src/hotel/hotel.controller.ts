import { Controller, Get, Post, Body } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel-dto';

@Controller('/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  getHotels() {
    return this.hotelService.findAll();
  }

  @Post('/create')
  createHotel(@Body('input') input: CreateHotelDto) {
    return this.hotelService.create(input);
  }
}
