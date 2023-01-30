import { Test, TestingModule } from '@nestjs/testing';
import { PrismaPgService } from './prisma.pg.service';

describe('PrismaPgService', () => {
  let service: PrismaPgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaPgService],
    }).compile();

    service = module.get<PrismaPgService>(PrismaPgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
