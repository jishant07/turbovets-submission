import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrganisationDto, UpdateOrganisationDto } from '@turbovets/data';
import { AuthGuard } from '@turbovets/auth';

@UseGuards(AuthGuard)
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationService.create(createOrganisationDto);
  }

  @Get()
  findAll() {
    return this.organisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto
  ) {
    return this.organisationService.update(id, updateOrganisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(id);
  }
}
