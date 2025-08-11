import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto, RequestWithCurrentUser, Task, UpdateTaskDto } from "@turbovets/data";
import { Repository } from "typeorm";
import { Response } from 'express'
import { respond_failure, respond_ok } from "../utils/response.utils";

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

    async findAll(req : RequestWithCurrentUser, res: Response){
        const taskList = await this.taskRepository.find({where: {organisation: {id: req?.currentUser?.organisationId}}})

        if(taskList.length){
            return respond_ok(res, {tasks : taskList})
        }else{
            return respond_failure(res, {message: "No Tasks Found"}, HttpStatus.NOT_FOUND)
        }
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