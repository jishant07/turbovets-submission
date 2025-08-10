import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity"
import { Actions, Resources } from "../interfaces/resource.interface";
import { RolePermissions } from "./junction.entity";

@Entity({ name: 'permissions' })
export class Permissions extends BaseEntity{

    @Column({ type: 'enum', enum: Actions, nullable: false })
    action: Actions

    @Column({ type: 'enum', enum: Resources, nullable: false })
    resource: Resources

    @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.permission)
    rolePermissions: RolePermissions[];
}