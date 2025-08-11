import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@turbovets/auth";
import { RolesService } from "./roles.service";

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {

    constructor(private rolesService: RolesService){}

    @Get()
    findAll() {
    return this.rolesService.findAllRoles();
    }

}