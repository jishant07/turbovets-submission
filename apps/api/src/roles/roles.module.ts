import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@turbovets/data';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles]), 
    forwardRef(() => PermissionsModule)
  ],
  providers: [RolesService, RoleRepository],
  exports: [RoleRepository, RolesService]
})
export class RolesModule {}
