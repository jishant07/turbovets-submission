import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@turbovets/data';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RoleRepository, RolesService]
})
export class RolesModule {}
