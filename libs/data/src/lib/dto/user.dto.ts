import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
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

    @IsOptional()
    @IsString()
    userRoleId?: string

    @IsOptional()
    role?: Roles

    @IsOptional()
    @IsUUID()
    organisationId?: string

    @IsOptional()
    organisation?: Organisation
}

export class UpdateUserDto extends CreateUserDto{}

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
