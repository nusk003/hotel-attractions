import { Module } from '@nestjs/common';
import { AttractionsResolver } from './attractions.resolver';
import { AttractionsService } from './attractions.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attractions, Hotel } from './attractions.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Attractions, Hotel])],
  providers: [AttractionsResolver, AttractionsService],
})
export class AttractionsModule {}
