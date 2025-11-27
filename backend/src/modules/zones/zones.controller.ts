import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@ApiTags('zones')
@Controller('api/zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать зону' })
  @ApiResponse({ status: 201, description: 'Зона успешно создана' })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все зоны' })
  @ApiResponse({ status: 200, description: 'Список зон' })
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить зону по ID' })
  @ApiResponse({ status: 200, description: 'Данные зоны' })
  @ApiResponse({ status: 404, description: 'Зона не найдена' })
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить зону' })
  @ApiResponse({ status: 200, description: 'Зона успешно обновлена' })
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(id, updateZoneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить зону' })
  @ApiResponse({ status: 200, description: 'Зона успешно удалена' })
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id);
  }
}
