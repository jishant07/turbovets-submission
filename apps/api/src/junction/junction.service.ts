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

  async getPermissionsFromRoleId(roleId: string){
    const permissions = await this.rolesPermissionRepository.getPermissionsFromRoleId(roleId)
    return permissions
  }
}
