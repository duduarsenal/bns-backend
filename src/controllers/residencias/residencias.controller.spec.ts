import { Test, TestingModule } from '@nestjs/testing';
import { ResidenciasController } from './residencias.controller';

describe('ResidenciasController', () => {
  let controller: ResidenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenciasController],
    }).compile();

    controller = module.get<ResidenciasController>(ResidenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
