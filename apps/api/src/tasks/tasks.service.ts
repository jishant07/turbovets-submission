import { Injectable } from '@nestjs/common';
import { CreateTaskDto, Organisation, RequestWithCurrentUser, UpdateTaskDto } from '@turbovets/data';
import { TaskRepository } from './task.repository';
import { UsersService } from '../users/users.service';
import { Response } from 'express'
import { OrganisationService } from '../organisation/organisation.service';
import { respond_ok } from './../utils/response.utils';

@Injectable()
export class TasksService {

  constructor(
    private readonly userService: UsersService,
    private readonly taskRepository: TaskRepository,
    private readonly organisationService: OrganisationService
  ){}

  async create(req : RequestWithCurrentUser, res: Response, createTaskDto: CreateTaskDto) {

    const { userId, organisationId } = req?.currentUser || {}

    if(userId){
      const user = await this.userService.findOneById(userId)
      createTaskDto.user = user
    }

    if(organisationId){
      const organisation: Organisation = await this.organisationService.findOne(organisationId)
      createTaskDto.organisation = organisation
    }

    return respond_ok(res, {task: await this.taskRepository.createTask(createTaskDto)})
  }

  findAll(req : RequestWithCurrentUser, res: Response) {
    return this.taskRepository.findAll(req, res)
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  findAllTaskOfAUser(userId: string){
    return this.taskRepository.findAllTaskOfAUser(userId)
  }

  async update(req : RequestWithCurrentUser, res: Response, id: string, updateTaskDto: UpdateTaskDto) {

    const { userId } = req?.currentUser || {}

    if(userId){
      const user = await this.userService.findOneById(userId)
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
