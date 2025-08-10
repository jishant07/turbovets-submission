import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  create(createPermissionDto: unknown) {
    return 'This action adds a new permission';
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: unknown) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
