import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LossesService } from './losses.service';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';

@ApiTags('perda')
@Controller('losses')
export class LossesController {
  constructor(private readonly service: LossesService) {}
  @Post() create(@Body() dto: CreateLossDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateLossDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
