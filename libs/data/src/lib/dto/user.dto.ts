import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Organisation, Roles } from '../entities'

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    name: string
}

export class UpdateUserDto extends CreateUserDto{

    @IsOptional()
    role?: Roles

    @IsOptional()
    organisation?: Organisation

}

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
