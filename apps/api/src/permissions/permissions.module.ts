import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from './permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from '@turbovets/data';
import { RolesModule } from '../roles/roles.module';
import { JunctionModule } from '../junction/junction.module';

@Module({
  imports:[TypeOrmModule.forFeature([Permissions]), RolesModule, JunctionModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository],
  exports: [PermissionRepository]
})
export class PermissionsModule {}
