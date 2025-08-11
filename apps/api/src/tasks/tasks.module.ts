import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@turbovets/data';
import { TaskRepository } from './task.repository';
import { UsersModule } from '../users/users.module';
import { OrganisationModule } from '../organisation/organisation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule, OrganisationModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TasksService]
})
export class TasksModule {}
