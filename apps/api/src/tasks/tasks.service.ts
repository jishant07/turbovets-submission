import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from '@turbovets/data';
import { TaskRepository } from './task.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly userService: UsersService,
    private readonly taskRepository: TaskRepository
  ){}

  async create(createTaskDto: CreateTaskDto) {
    if(createTaskDto.userId){
      const user = await this.userService.findOneById(createTaskDto.userId)
      delete createTaskDto.userId
      createTaskDto.user = user
    }
    return this.taskRepository.createTask(createTaskDto)
  }

  findAll() {
    return this.taskRepository.findAll()
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  findAllTaskOfAUser(userId: string){
    return this.taskRepository.findAllTaskOfAUser(userId)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    if(updateTaskDto.userId){
      const user = await this.userService.findOneById(updateTaskDto.userId)
      delete updateTaskDto.userId
      updateTaskDto.user = user
    }
    const { affected } = await this.taskRepository.update(id, updateTaskDto);

    if(affected){
      return {
        success: true,
        message: "Task Updated Successfully"
      }
    }else{
      return {
        success: false,
        message: "Task Update Failed"
      }
    }
  }

  remove(id: string) {
    return this.taskRepository.remove(id);
  }
}
