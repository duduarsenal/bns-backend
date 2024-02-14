import { Test, TestingModule } from '@nestjs/testing';
import { EncomendasController } from './encomendas.controller';

describe('EncomendasController', () => {
  let controller: EncomendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncomendasController],
    }).compile();

    controller = module.get<EncomendasController>(EncomendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
