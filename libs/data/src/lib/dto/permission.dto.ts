import { IsEnum, IsNotEmpty } from "class-validator";
import { Actions, Resources } from "../interfaces";

export class CreatePermissionDto {
    
    @IsNotEmpty()
    @IsEnum(Actions)
    action: Actions

    @IsNotEmpty()
    @IsEnum(Resources)
    resource: Resources
}