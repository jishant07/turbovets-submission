import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../interfaces";

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

}

export class UpdateTaskDto extends CreateTaskDto{}
