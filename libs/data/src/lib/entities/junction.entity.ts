import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Roles } from "./roles.entity";
import { Permissions } from "./permissions.entity";

@Entity({ name: 'role_permissions' })
export class RolePermissions {

    @PrimaryColumn({ name: 'role_id' })
    roleId: string

    @PrimaryColumn({ name: 'permission_id' })
    permissionId: string

    @ManyToOne(() => Roles, (role) => role.rolePermissions)
    @JoinColumn({ name: 'role_id' })
    role: Roles

    @ManyToOne(() => Permissions, (permission) => permission.rolePermissions)
    @JoinColumn({ name: 'permission_id' })
    permission: Permissions

}