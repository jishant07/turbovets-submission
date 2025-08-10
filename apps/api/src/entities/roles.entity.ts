import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserRoles } from "@turbovets/data";
import { RolePermissions } from "./junction.entity";

@Entity({ name: "roles" })
export class Roles extends BaseEntity{

    @Column({ type:'enum', enum: UserRoles, nullable: false})
    name: UserRoles

    @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.role)
    rolePermissions: RolePermissions[];

}