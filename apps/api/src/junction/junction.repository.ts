import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateRolePermissionDto,
  RolePermissions
} from '@turbovets/data';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionsRepository {
  constructor(
    @InjectRepository(RolePermissions)
    private readonly rolePermissionRepository: Repository<RolePermissions>
  ) {}

    async createRolePermissionEntry(createRolePermissionDto : CreateRolePermissionDto){
        const rolePermissionEntry = await this.rolePermissionRepository.create(createRolePermissionDto)
        return this.rolePermissionRepository.save(rolePermissionEntry)
    }

    async getPermissionsFromRoleId(roleId: string){
      const rolePermissions = await this.rolePermissionRepository.find({where: {roleId}})
      return rolePermissions.map((item: RolePermissions) =>{
        return {
          action: item.permission.action,
          resource: item.permission.resource
        }
      })
    }

}