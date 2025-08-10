import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Organisation } from "../entities/organisations.entity";

export class CreateOrganisationDto{

    @IsNotEmpty()
    @IsString()
    name: string

}

export class UpdateOrganisationDto extends CreateOrganisationDto{

    @IsOptional()
    parent : Organisation

}