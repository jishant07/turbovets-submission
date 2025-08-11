import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepository } from './organisation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisation } from '@turbovets/data';

@Module({
  imports: [TypeOrmModule.forFeature([Organisation])],
  controllers: [OrganisationController],
  providers: [OrganisationService, OrganisationRepository],
  exports: [OrganisationService]
})
export class OrganisationModule {}
