import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity"
import { Resources } from "../interfaces/resource.interface";
import { RolePermissions } from "./junction.entity";

@Entity({ name: 'permissions' })
export class Permissions extends BaseEntity{

    @Column({ type: 'varchar', nullable: false })
    action: string

    @Column({ type: 'enum', enum: Resources, nullable: false })
    resource: Resources

    @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.permission)
    rolePermissions: RolePermissions[];
}