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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@ApiTags('drivers')
@Controller('api/drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({ summary: 'Создать водителя' })
  @ApiResponse({ status: 201, description: 'Водитель успешно создан' })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех водителей' })
  @ApiResponse({ status: 200, description: 'Список водителей' })
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить водителя по ID' })
  @ApiResponse({ status: 200, description: 'Данные водителя' })
  @ApiResponse({ status: 404, description: 'Водитель не найден' })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить водителя' })
  @ApiResponse({ status: 200, description: 'Водитель успешно обновлен' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить водителя' })
  @ApiResponse({ status: 200, description: 'Водитель успешно удален' })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'Получить документы водителя' })
  @ApiResponse({ status: 200, description: 'Список документов' })
  getDocuments(@Param('id') id: string) {
    return this.driversService.getDriverDocuments(id);
  }

  @Get(':id/shifts')
  @ApiOperation({ summary: 'Получить смены водителя' })
  @ApiResponse({ status: 200, description: 'Список смен' })
  getShifts(@Param('id') id: string) {
    return this.driversService.getDriverShifts(id);
  }
}
