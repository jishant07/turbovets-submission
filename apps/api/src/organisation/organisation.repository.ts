import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto, Organisation, UpdateTaskDto } from "@turbovets/data";
import { Repository } from "typeorm";

@Injectable()
export class OrganisationRepository{

    constructor(
        @InjectRepository(Organisation)
        private readonly organisationRepository: Repository<Organisation>
    ){}

    async createTask(createTaskDto : CreateTaskDto){
        const task = await this.organisationRepository.create(createTaskDto)
        return this.organisationRepository.save(task)
    }

    async findAll(){
        return this.organisationRepository.find()
    }

    async findOne(id: string){
        return this.organisationRepository.findOne({where: {id}})
    }

    async update(id : string, updateTaskDto: UpdateTaskDto){
        return this.organisationRepository.update(id, {...updateTaskDto})
    }

    async remove(id: string){
        return this.organisationRepository.remove(await this.findOne(id))
    }


}