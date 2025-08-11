import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '@turbovets/data';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles]), 
    forwardRef(() => PermissionsModule)
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RoleRepository, RolesService]
})
export class RolesModule {}
