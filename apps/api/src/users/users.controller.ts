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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express'
import { CreateUserDto, LoginDTO, UpdateUserDto } from '@turbovets/data';
import { AuthGuard } from '@turbovets/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Req() req: Request, @Res() res : Response, @Body() body: LoginDTO){
    return this.usersService.login(req, res, body)
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(res, createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
