import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express'

import { CreateUserDto, LoginDTO, RequestWithCurrentUser } from '@turbovets/data';
import { UpdateUserDto } from '@turbovets/data';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { respond_failure, respond_ok } from '../utils/response.utils';
import { JwtService } from '@nestjs/jwt';
import { JunctionService } from '../junction/junction.service';

@Injectable()
export class UsersService{

  constructor(
    private readonly userRepository: UserRepository,
    private readonly junctionService: JunctionService,
    private readonly jwtService: JwtService
  ){}

  async create(res: Response, createUserDto: CreateUserDto) {
    if(await this.userRepository.findUserByEmail(createUserDto.email, false)){
      throw new InternalServerErrorException('Email Already Exists')
    }else{
      const password = await bcrypt.hash(createUserDto.password, +(process.env.SALT_ROUNDS))
      createUserDto.password = password
      const createdUser = await this.userRepository.createUser(createUserDto)
      delete createdUser.password
      return respond_ok(res, { user: createdUser })
    }
  }

  async createSuperAdmin(){
    const superAdminCreateDTO : CreateUserDto = {
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      name: process.env.SUPERADMIN_NAME
    }
    const user = await this.userRepository.findUserByEmail(superAdminCreateDTO.email, false)
    if(user){
      return user
    }else{
      const password = await bcrypt.hash(superAdminCreateDTO.password, +(process.env.SALT_ROUNDS))
      superAdminCreateDTO.password = password
      const createdUser = await this.userRepository.createUser(superAdminCreateDTO)
      return createdUser
    }
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(req: RequestWithCurrentUser, id: string) {
    console.log(req.currentUser)
    return this.userRepository.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id,updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.removeUser(id);
  }

  async login(req: Request, res: Response, body: LoginDTO){
    const user = await this.userRepository.findUserByEmail(body.email, true)
    
    if(user && user.password){
      const passwordCompareResult = await bcrypt.compare(body.password, user.password)
      if(passwordCompareResult){
        const jwtPayload = {
          userId: user.id,
          userEmail: user.email,
          name: user.name,
          role: user.role.name,
          permissions: await this.junctionService.getPermissionsFromRoleId(user.role.id)
        }
        const token = await this.jwtService.signAsync(jwtPayload)
        return respond_ok(res, {"message": "User Logged In Successfully", token})

      }else{
        return respond_failure(res, {"message": "Password provided is incorrect"})
      }
    }else{
      return respond_failure(res, {message: "User not found"}, HttpStatus.NOT_FOUND)
    }
  }
}
