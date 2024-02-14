import { Test, TestingModule } from '@nestjs/testing';
import { EncomendasService } from './encomendas.service';

describe('EncomendasService', () => {
  let service: EncomendasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncomendasService],
    }).compile();

    service = module.get<EncomendasService>(EncomendasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
