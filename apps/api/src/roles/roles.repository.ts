import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles, UserRoles } from "@turbovets/data";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepository{

    constructor(
        @InjectRepository(Roles)
        private readonly roleRepository: Repository<Roles>
    ){}

    createRole(roleName: UserRoles){
        const role = this.roleRepository.create({name: roleName});
        return this.roleRepository.save(role)
    }

    findAllRoles(){
        return this.roleRepository.find()
    }

    findRoleByName(roleName: UserRoles){
        return this.roleRepository.findOne({where: {name: roleName}})
    }

}