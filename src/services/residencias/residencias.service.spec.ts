import { Test, TestingModule } from '@nestjs/testing';
import { ResidenciasService } from './residencias.service';

describe('ResidenciasService', () => {
  let service: ResidenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenciasService],
    }).compile();

    service = module.get<ResidenciasService>(ResidenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
