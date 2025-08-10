import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { OrganisationRepository } from './organisation.repository';

@Module({
  controllers: [OrganisationController],
  providers: [OrganisationService, OrganisationRepository],
})
export class OrganisationModule {}
