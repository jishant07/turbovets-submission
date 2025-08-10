import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionRepository } from './permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from '@turbovets/data';
import { RolesModule } from '../roles/roles.module';
import { JunctionModule } from '../junction/junction.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permissions]), 
    forwardRef(() => RolesModule),
    JunctionModule, 
    UsersModule
  ],
  providers: [PermissionsService, PermissionRepository],
  exports: [PermissionRepository, PermissionsService]
})
export class PermissionsModule {}
