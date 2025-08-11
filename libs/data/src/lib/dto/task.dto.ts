import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../interfaces";
import { Organisation, User } from "../entities";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsEnum(TaskStatus)
    @IsOptional()
    tastStatus: TaskStatus

    @IsOptional()
    user?: User

    @IsOptional()
    organisation: Organisation
}

export class UpdateTaskDto extends CreateTaskDto{}
