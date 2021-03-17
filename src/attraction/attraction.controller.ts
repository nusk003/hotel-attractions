import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AttractionService } from './attraction.service';
import { CreateAttractionDto } from './dto/create-attraction-dto';
import { Args } from '@nestjs/graphql';
import { CreateAttrationInput } from './InputTypes/create-attraction-input';

@Controller('/attractions')
export class AttractionController {
  constructor(private readonly attractionService: AttractionService) {}

  @Post('/create')
  createAttraction(@Body('input') input: CreateAttractionDto) {
    return this.attractionService.create(input);
  }
}
