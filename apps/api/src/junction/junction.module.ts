import { Module } from '@nestjs/common';
import { JunctionService } from './junction.service';
import { RolePermissionsRepository } from './junction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissions } from '@turbovets/data';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissions])],
  controllers: [],
  providers: [JunctionService, RolePermissionsRepository],
  exports: [JunctionService]
})
export class JunctionModule {}
