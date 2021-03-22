import { Test, TestingModule } from '@nestjs/testing';
import { AttractionsResolver } from './attractions.resolver';

describe('AttractionsResolver', () => {
  let resolver: AttractionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttractionsResolver],
    }).compile();

    resolver = module.get<AttractionsResolver>(AttractionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
