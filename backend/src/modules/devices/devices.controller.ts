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
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('devices')
@Controller('api/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать устройство' })
  @ApiResponse({ status: 201, description: 'Устройство успешно создано' })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все устройства' })
  @ApiResponse({ status: 200, description: 'Список устройств' })
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить устройство по ID' })
  @ApiResponse({ status: 200, description: 'Данные устройства' })
  @ApiResponse({ status: 404, description: 'Устройство не найдено' })
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить устройство' })
  @ApiResponse({ status: 200, description: 'Устройство успешно обновлено' })
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить устройство' })
  @ApiResponse({ status: 200, description: 'Устройство успешно удалено' })
  remove(@Param('id') id: string) {
    return this.devicesService.remove(id);
  }

  @Get(':id/locations')
  @ApiOperation({ summary: 'Получить локации устройства' })
  @ApiResponse({ status: 200, description: 'Список локаций' })
  getLocations(@Param('id') id: string) {
    return this.devicesService.getDeviceLocations(id);
  }
}
