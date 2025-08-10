import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganisationService {
  create(createOrganisationDto: unknown) {
    return 'This action adds a new organisation';
  }

  findAll() {
    return `This action returns all organisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organisation`;
  }

  update(id: number, updateOrganisationDto: unknown) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
