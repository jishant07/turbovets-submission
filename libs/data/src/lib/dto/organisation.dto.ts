import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Organisation } from "../entities";

export class CreateOrganisationDto{

    @IsNotEmpty()
    @IsString()
    name: string

}

export class UpdateOrganisationDto extends CreateOrganisationDto{

    @IsOptional()
    @IsUUID()
    parentId?: string

    @IsOptional()
    parent: Organisation

}