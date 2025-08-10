import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePermissionDto,
  Permissions
} from '@turbovets/data';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionRepository: Repository<Permissions>
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const checkPermissionExists = await this.permissionRepository.findOne({where: {resource: createPermissionDto.resource, action: createPermissionDto.action}})
    if(!checkPermissionExists){
        const permission = await this.permissionRepository.create(
          createPermissionDto
        );
        return await this.permissionRepository.save(permission);
    }
  }

  findAllPermissions() {
    return this.permissionRepository.find();
  }

  getPermissionFromResourceAndAction(queryObject: CreatePermissionDto){
    return this.permissionRepository.findOne({where: {action: queryObject.action, resource: queryObject.resource}})
  }
}
