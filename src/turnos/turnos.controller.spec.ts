import { Test, TestingModule } from '@nestjs/testing';
import { TurnosController } from './turnos.controller';

describe('TurnosController', () => {
  let controller: TurnosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurnosController],
    }).compile();

    controller = module.get<TurnosController>(TurnosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
