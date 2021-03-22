import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Attractions,
  AttractionsDocument,
  CatalogDocument,
  Catalog,
  CategoryDocument,
  Category,
} from './attractions.model';
import { Model } from 'mongoose';
import {
  AttractionsDto,
  CreateAttractionsDto,
  CreateCatalogDto,
  CreateCategoryDto,
} from './dto';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,

    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,

    @InjectModel(Attractions.name)
    private attractionModel: Model<AttractionsDocument>, // ,
  ) {}

  async getAttractions(hotel: string): Promise<Attractions> {
    return this.attractionModel.findOne({
      'hotel.id': hotel,
    });
  }

  async updateAttractions(
    hotel: string,
    { catalog }: any,
  ): Promise<Attractions> {
    // console.log(updatedAttr);
    const updatedAttraction = await this.attractionModel.findOne({
      'hotel.id': hotel,
    });
    // const catalogObj = await this.catalogModel.findOne({ name: catalog.name });
    updatedAttraction.catalog = catalog;
    return updatedAttraction.save();
  }

  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const createdCatalog = new this.catalogModel(createCatalogDto);
    return createdCatalog.save();
  }

  async createCategory(createCategory: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategory);
    return createdCategory.save();
  }

  async getOrCreateCatalog(createCatalogDto: CreateCatalogDto) {
    const defaultCatalog = await this.catalogModel.findOne({
      name: createCatalogDto.name,
    });

    if (defaultCatalog !== null) {
      return defaultCatalog;
    }

    return await this.createCatalog(createCatalogDto);
  }

  async getCategory(filter) {
    return this.categoryModel.findOne(filter);
  }

  async updateCategory(
    categoryName: string,
    updateAttr: Partial<CreateCategoryDto>,
  ): Promise<Category> {
    const category = await this.categoryModel.findOne({ name: categoryName });
    for (let key of Object.keys(updateAttr)) {
      category[key] = updateAttr[key];
    }
    return category.save();
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async createAttractions(
    createAttractionsDto: CreateAttractionsDto,
  ): Promise<Attractions> {
    console.log(createAttractionsDto);
    const createdAttractions = new this.attractionModel(createAttractionsDto);
    console.log(createdAttractions);
    return createdAttractions.save();
  }
}
