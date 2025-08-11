import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express'
import { Actions, CreateUserDto, LoginDTO, Resources, UpdateUserDto } from '@turbovets/data';
import { AuthGuard, PermissionCheckGuard } from '@turbovets/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Req() req: Request, @Res() res : Response, @Body() body: LoginDTO){
    return this.usersService.login(req, res, body)
  }

  @Post()
  @UseGuards(AuthGuard, PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.USERS}:${Actions.CREATE}`])
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(res, createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.USERS}:${Actions.READ}`])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.USERS}:${Actions.READ}`])
  findOne(@Req() req : Request, @Param('id') id: string) {
    return this.usersService.findOne(req, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.USERS}:${Actions.UPDATE}`])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.USERS}:${Actions.DELETE}`])
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
