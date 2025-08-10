import { Module } from '@nestjs/common';
import { JunctionService } from './junction.service';
import { JunctionController } from './junction.controller';

@Module({
  controllers: [JunctionController],
  providers: [JunctionService],
})
export class JunctionModule {}
