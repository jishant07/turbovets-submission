import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@turbovets/data";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from '@turbovets/data';

@Injectable()
export class UserRepository{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findUserByEmail(email: string, includePassword = false) {
        return this.userRepository.findOne({
            where: { email },
            select: includePassword ? ['id', 'email', 'name', 'password'] : undefined
        });
    }

    async findAll(){
        return this.userRepository.find()
    }

    async findById(id: string){
        const user = await this.userRepository.findOneBy({id})
        if(user){
            return user
        }else{
            throw new NotFoundException('User with this Id not found')
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto){
        return this.userRepository.update({id}, {...updateUserDto})
    }

    async removeUser(id: string){
        return this.userRepository.delete({id})
    }

}