import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto, Task, UpdateTaskDto } from "@turbovets/data";
import { Repository } from "typeorm";

@Injectable()
export class TaskRepository{

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ){}

    async createTask(createTaskDto : CreateTaskDto){
        const task = await this.taskRepository.create(createTaskDto)
        return this.taskRepository.save(task)
    }

    async findAll(){
        return this.taskRepository.find()
    }

    async findOne(id: string){
        return this.taskRepository.findOne({where: {id}})
    }

    async update(id : string, updateTaskDto: UpdateTaskDto){
        return this.taskRepository.update(id, {...updateTaskDto})
    }

    async remove(id: string){
        return this.taskRepository.remove(await this.findOne(id))
    }

    async findAllTaskOfAUser(userId: string){
        return this.taskRepository.find({where : {
            user: {
                id: userId
            }
        }})
    }

}