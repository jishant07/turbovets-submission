import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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

export class UpdateUserDto extends CreateUserDto{}

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
