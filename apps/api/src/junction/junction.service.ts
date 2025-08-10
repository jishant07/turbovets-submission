import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from '@turbovets/data';
import { RolePermissionsRepository } from './junction.repository';

@Injectable()
export class JunctionService {

  constructor(
    private readonly rolesPermissionRepository : RolePermissionsRepository
  ){}

  create(createJunctionDto: CreateRolePermissionDto) {
    return this.rolesPermissionRepository.createRolePermissionEntry(createJunctionDto)  
  }
}
