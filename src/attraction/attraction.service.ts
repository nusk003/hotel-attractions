import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attraction, AttractionDocument } from './attraction.schema';
import { CreateAttractionDto } from './dto/create-attraction-dto';

@Injectable()
export class AttractionService {
  constructor(
    @InjectModel(Attraction.name)
    private attractionModel: Model<AttractionDocument>,
  ) {}

  async create(createAttractionDto: CreateAttractionDto): Promise<Attraction> {
    const createdAttraction = new this.attractionModel(createAttractionDto);
    return createdAttraction.save();
  }

  async findAll(): Promise<Attraction[]> {
    return this.attractionModel.find().exec();
  }
}
