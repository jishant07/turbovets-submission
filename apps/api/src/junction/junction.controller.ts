import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JunctionService } from './junction.service';

@Controller('junction')
export class JunctionController {
  constructor(private readonly junctionService: JunctionService) {}

  @Post()
  create(@Body() createJunctionDto: unknown) {
    return this.junctionService.create(createJunctionDto);
  }

  @Get()
  findAll() {
    return this.junctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.junctionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJunctionDto: unknown
  ) {
    return this.junctionService.update(+id, updateJunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.junctionService.remove(+id);
  }
}
