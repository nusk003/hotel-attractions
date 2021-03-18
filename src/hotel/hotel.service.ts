import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Hotel, HotelDocument } from './hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel-dto';
import { CreateHotelInput } from './InputTypes/create-hotel.input';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<HotelDocument>, // @Inject(forwardRef(() => AttractionService)) // private attractionService: AttractionService,
  ) {}

  async create(createHotelInput: CreateHotelInput): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelInput);
    return createdHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findById(id: string): Promise<Hotel> {
    return this.hotelModel.findOne({ id });
  }

  async updateHotel(id: string, updatedAttrs): Promise<Hotel> {
    return this.hotelModel.findOneAndUpdate({ id }, updatedAttrs);
  }
}
