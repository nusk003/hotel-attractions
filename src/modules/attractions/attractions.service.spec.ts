import { Test, TestingModule } from '@nestjs/testing';
import { AttractionsService } from './attractions.service';

describe('AttractionsService', () => {
  let service: AttractionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttractionsService],
    }).compile();

    service = module.get<AttractionsService>(AttractionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
