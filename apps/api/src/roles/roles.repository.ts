import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles, UserRoles } from "@turbovets/data";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepository{

    constructor(
        @InjectRepository(Roles)
        private readonly userRepository: Repository<Roles>
    ){}

    createRole(roleName: UserRoles){
        const role = this.userRepository.create({name: roleName});
        return this.userRepository.save(role)
    }

    findAllRoles(){
        return this.userRepository.find()
    }

}