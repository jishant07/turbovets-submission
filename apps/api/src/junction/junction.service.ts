import { Injectable } from '@nestjs/common';

@Injectable()
export class JunctionService {
  create(createJunctionDto: unknown) {
    return 'This action adds a new junction';
  }

  findAll() {
    return `This action returns all junction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} junction`;
  }

  update(id: number, updateJunctionDto: unknown) {
    return `This action updates a #${id} junction`;
  }

  remove(id: number) {
    return `This action removes a #${id} junction`;
  }
}
