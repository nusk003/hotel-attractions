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

  async getAttraction(id: string): Promise<Attraction> {
    return this.attractionModel.findOne({ id });
  }

  async getOrCreateAttraction(
    createAttractionDto: CreateAttractionDto,
  ): Promise<Attraction> {
    let attraction = await this.getAttraction(createAttractionDto.id);
    if (attraction !== null) {
      return attraction;
    }

    attraction = await this.create(createAttractionDto);
    console.log(attraction);
    return attraction;
  }
}
