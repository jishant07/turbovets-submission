import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRoles } from '@turbovets/data';
import { RoleRepository } from './roles.repository';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {

  constructor(
    @Inject(forwardRef(() => PermissionsService))
    private readonly permissionsService: PermissionsService,
    private readonly roleRepository: RoleRepository
  ){}

  async findAllRoles(){
    return this.roleRepository.findAllRoles()
  }

  async createRole(roleName: UserRoles){
    const checkRoleExists = await this.roleRepository.findRoleByName(roleName)
    if(!checkRoleExists){
      return this.roleRepository.createRole(roleName)
    }
    return checkRoleExists
  }

  async getPermissionFromRole(roleId : string){
    return this.permissionsService.getAllPermissionsFromRole(roleId)
  }
}
