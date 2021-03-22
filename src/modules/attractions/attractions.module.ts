import { Module, forwardRef } from '@nestjs/common';
import { AttractionsResolver } from './attractions.resolver';
import { AttractionsService } from './attractions.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Attractions,
  CategorySchema,
  Catalog,
  CatalogSchema,
  Category,
  AttractionsSchema,
} from './attractions.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Catalog.name, schema: CatalogSchema },
      { name: Attractions.name, schema: AttractionsSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [AttractionsResolver, AttractionsService],
})
export class AttractionsModule {}
