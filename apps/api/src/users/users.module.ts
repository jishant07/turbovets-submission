import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../entities/user.entity';
// import { Organisation } from '../entities/organisations.entity';
// import { Roles } from '../entities/roles.entity';
// import { Task } from '../entities/task.entity';
// import { RolePermissions } from '../entities/junction.entity';
// import { Permissions } from '../entities/permissions.entity';
import { UserRepository } from './user.repository';
import { User, Organisation, Roles, Task, RolePermissions, Permissions } from '@turbovets/data';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    Organisation, 
    Roles, 
    Task, 
    RolePermissions, 
    Permissions
  ])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
