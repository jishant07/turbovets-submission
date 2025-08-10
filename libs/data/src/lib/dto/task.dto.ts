import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TaskStatus } from "../interfaces";
import { User } from "../entities";

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
    @IsUUID()
    userId?: string

    @IsOptional()
    user?: User
}

export class UpdateTaskDto extends CreateTaskDto{}
