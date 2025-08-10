import { Injectable } from '@nestjs/common';
import { OrganisationRepository } from './organisation.repository';
import { CreateOrganisationDto, UpdateOrganisationDto } from '@turbovets/data';

@Injectable()
export class OrganisationService {

  constructor(
    private readonly organisationRepository: OrganisationRepository
  ){}

  create(createOrganisationDto: CreateOrganisationDto) {
    return this.organisationRepository.createTask(createOrganisationDto);
  }

  findAll() {
    return this.organisationRepository.findAll();
  }

  findOne(id: string) {
    return this.organisationRepository.findOne(id);
  }

  async update(id: string, updateOrganisationDto: UpdateOrganisationDto) {
    if(updateOrganisationDto.parentId){
      const parentOrg = await this.findOne(updateOrganisationDto.parentId)
      delete updateOrganisationDto.parentId
      updateOrganisationDto.parent = parentOrg
    }
    const { affected } = await this.organisationRepository.update(id, {...updateOrganisationDto});
    if(affected){
      return {
        success: true,
        message: "Updated the organisation successfully"
      }
    }else{
      return {
        success: false,
        message: "Organisation Update Failed"
      }
    }
  }

  remove(id: string) {
    return this.organisationRepository.remove(id);
  }
}
