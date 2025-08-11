import { Controller, Get, Post, Body, Param, Delete, UseGuards, SetMetadata, Put, Req, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Actions, CreateTaskDto, RequestWithCurrentUser, Resources, UpdateTaskDto } from '@turbovets/data';
import { AuthGuard, PermissionCheckGuard } from '@turbovets/auth';
import { Response } from 'express'

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.CREATE}`])
  create(@Req() req : RequestWithCurrentUser, @Res() res : Response, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req, res, createTaskDto);
  }

  // Scope To Org Left
  @Get()
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.READ}`])
  findAll(@Req() req: RequestWithCurrentUser, @Res() res: Response) {
    return this.tasksService.findAll(req, res);
  }

  // Scope To Org Left
  @Get('/userTasks/:id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.READ}`])
  findTasksByUserId(@Req() req: RequestWithCurrentUser, @Res() res: Response, @Param('id') userId: string){
    return this.tasksService.findAllTaskOfAUser(userId)
  }

  //Scope To Org Left
  @Get(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.READ}`])
  findOne(@Req() req: RequestWithCurrentUser, @Res() res: Response, @Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.UPDATE}`])
  update(@Req() req: RequestWithCurrentUser, @Res() res: Response, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(req, res, id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.TASKS}:${Actions.DELETE}`])
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
