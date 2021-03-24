import { Injectable } from '@nestjs/common';

import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attractions, Hotel } from './attractions.entity';
import { CreateAttraction, HotelInput } from './dto';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attractions)
    private attractionModel: EntityRepository<Attractions>,
    @InjectRepository(Hotel)
    private hotelModel: EntityRepository<Hotel>,
  ) {}

  async getAttractionByHotel(hotel: string): Promise<Attractions> {
    const attraction = await this.attractionModel.findOne({ hotel });
    await wrap(attraction.hotel).init();
    return attraction;
  }

  async createAttraction(
    createAttractionInput: CreateAttraction,
  ): Promise<Attractions> {
    const createdAttraction = new Attractions();
    createdAttraction.hotel = createAttractionInput.hotel;
    createdAttraction.catalog = createAttractionInput.catalog;
    await this.attractionModel.persist(createdAttraction).flush();
    return createdAttraction;
  }

  async updateAttraction(attraction: Attractions) {
    return this.attractionModel.persist(attraction).flush();
  }

  async getHotels(): Promise<Hotel[]> {
    return this.hotelModel.findAll();
  }

  async getHotel(id: string): Promise<Hotel> {
    return this.hotelModel.findOne(id);
  }

  async createHotel(createHotel: HotelInput): Promise<Hotel> {
    const createdHotel = new Hotel();
    wrap(createdHotel).assign(createHotel);
    await this.attractionModel.persist(createdHotel).flush();
    return createdHotel;
  }
}
