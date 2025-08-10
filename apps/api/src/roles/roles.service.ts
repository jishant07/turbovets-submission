import { Injectable } from '@nestjs/common';
import { UserRoles } from '@turbovets/data';
import { RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {

  constructor(
    private readonly roleRepository: RoleRepository
  ){}

  async findAllRoles(){
    return this.roleRepository.findAllRoles()
  }

  async createRole(roleName: UserRoles){
    return this.roleRepository.createRole(roleName)
  }
}
