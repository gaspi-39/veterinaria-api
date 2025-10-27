import { Test, TestingModule } from '@nestjs/testing';
import { TurnosService } from './turnos.service';

describe('TurnosService', () => {
  let service: TurnosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnosService],
    }).compile();

    service = module.get<TurnosService>(TurnosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
