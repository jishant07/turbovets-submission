import { Test, TestingModule } from '@nestjs/testing';
import { JunctionController } from './junction.controller';
import { JunctionService } from './junction.service';

describe('JunctionController', () => {
  let controller: JunctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JunctionController],
      providers: [JunctionService],
    }).compile();

    controller = module.get<JunctionController>(JunctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
