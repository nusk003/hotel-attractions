import { Controller, Get, Post, Req, Body, Query } from '@nestjs/common';
import { AttractionService } from './attraction.service';
import { CreateAttractionDto } from './dto/create-attraction-dto';
import { Args } from '@nestjs/graphql';
import { CreateAttrationInput } from './InputTypes/create-attraction-input';
import { GoogleMapsService } from 'src/googleMaps/google_maps.service';

@Controller('/attractions')
export class AttractionController {
  constructor(
    private readonly attractionService: AttractionService,
    public readonly googleMapService: GoogleMapsService,
  ) {}

  @Get()
  getAttractions(
    @Query('lat') lattitude: number,
    @Query('lon') longitude: number,
  ) {
    return this.googleMapService.getPlacesByCordinate(lattitude, longitude);
  }

  @Post('/create')
  createAttraction(@Body('input') input: CreateAttractionDto) {
    return this.attractionService.create(input);
  }
}
