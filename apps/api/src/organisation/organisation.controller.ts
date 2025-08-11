import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { Actions, CreateOrganisationDto, Resources, UpdateOrganisationDto } from '@turbovets/data';
import { AuthGuard, PermissionCheckGuard } from '@turbovets/auth';

@UseGuards(AuthGuard)
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.ORGANISATIONS}:${Actions.CREATE}`])
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationService.create(createOrganisationDto);
  }

  @Get()
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.ORGANISATIONS}:${Actions.READ}`])
  findAll() {
    return this.organisationService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.ORGANISATIONS}:${Actions.READ}`])
  findOne(@Param('id') id: string) {
    return this.organisationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.ORGANISATIONS}:${Actions.UPDATE}`])
  update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto
  ) {
    return this.organisationService.update(id, updateOrganisationDto);
  }

  @Delete(':id')
  @UseGuards(PermissionCheckGuard)
  @SetMetadata('permissions', [`${Resources.ORGANISATIONS}:${Actions.DELETE}`])
  remove(@Param('id') id: string) {
    return this.organisationService.remove(id);
  }
}
