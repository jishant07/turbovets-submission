import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from '@turbovets/data';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

  constructor(
    private readonly taskRepository: TaskRepository
  ){}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto)
  }

  findAll() {
    return this.taskRepository.findAll()
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.taskRepository.remove(id);
  }
}
