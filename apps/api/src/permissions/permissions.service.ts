import { Injectable, OnModuleInit } from '@nestjs/common';
import { PermissionRepository } from './permissions.repository';
import { RolesService } from '../roles/roles.service';
import { Actions, CreatePermissionDto, Resources, UserRoles } from '@turbovets/data';
import { JunctionService } from '../junction/junction.service';

const permissionObject = {
  [UserRoles.ADMIN]: [Actions.READ, Actions.UPDATE],
  [UserRoles.OWNER]: [Actions.CREATE, Actions.READ, Actions.UPDATE, Actions.DELETE],
  [UserRoles.VIEWER]: [Actions.READ]
}

@Injectable()
export class PermissionsService implements OnModuleInit {
  constructor(
    private readonly roleService: RolesService,
    private readonly junctionService: JunctionService,
    private readonly permissionRepository: PermissionRepository
  ) {}

  async onModuleInit() {
    if ((await this.permissionRepository.findAllPermissions()).length > 0 && (await this.roleService.findAllRoles()).length > 0) {
      console.log('Role and Permission Data Already Seeded');
    } else {
      try {
        await this.createRoleAndAttachPermissions()
        console.log('Role and Permission Data Seeding Successful');
      } catch (err) {
        console.log('Error in seeding permissions', err);
      }
    }
  }

  returnAllPermissions() {
    const resourceArray = [Resources.TASKS, Resources.USERS];
    const allPermissions = [
      Actions.CREATE,
      Actions.READ,
      Actions.UPDATE,
      Actions.DELETE,
    ];

    const returnArray = [];
    resourceArray.forEach((resource: Resources) => {
      allPermissions.forEach((action: Actions) => {
        returnArray.push({
          resource,
          action,
        });
      });
    });

    return returnArray;
  }

  async getPermissionFromResourceAndAction (queryObject: CreatePermissionDto) {
    return this.permissionRepository.getPermissionFromResourceAndAction(queryObject);
  }

  async createAllPermissions () {
    const permissionList = this.returnAllPermissions()
    await Promise.all(permissionList.map((item : CreatePermissionDto) => {return this.permissionRepository.createPermission(item)}))
  }

  async createRoleAndAttachPermissions () {
    
    await this.createAllPermissions()

    const userRoleList: UserRoles[] = [UserRoles.ADMIN, UserRoles.OWNER, UserRoles.VIEWER]

    for(const userRole of userRoleList){
      const roleInfo = await this.roleService.createRole(userRole)
      const userRolePermissions = permissionObject[userRole]
      const resourceArray = [Resources.TASKS, Resources.USERS]

      const commitArray = []

      for(const action of userRolePermissions){
        for(const resource of resourceArray){
          const permissionInfo = await this.getPermissionFromResourceAndAction({action, resource})
          commitArray.push(this.junctionService.create({roleId : roleInfo.id, permissionId : permissionInfo.id}))
        }
      }

      try{
        await Promise.all(commitArray)
      }catch(err){
        console.log("ROLES PERMISSION SEED FAILED", err)
      }
    }
  }
}
