import { Test, TestingModule } from '@nestjs/testing';
import { MoradoresService } from './moradores.service';

describe('MoradoresService', () => {
  let service: MoradoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoradoresService],
    }).compile();

    service = module.get<MoradoresService>(MoradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
