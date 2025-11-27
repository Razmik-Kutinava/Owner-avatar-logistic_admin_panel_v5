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
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@ApiTags('alerts')
@Controller('api/alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать алерт' })
  @ApiResponse({ status: 201, description: 'Алерт успешно создан' })
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все алерты' })
  @ApiResponse({ status: 200, description: 'Список алертов' })
  findAll() {
    return this.alertsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить алерт по ID' })
  @ApiResponse({ status: 200, description: 'Данные алерта' })
  @ApiResponse({ status: 404, description: 'Алерт не найден' })
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить алерт' })
  @ApiResponse({ status: 200, description: 'Алерт успешно обновлен' })
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.update(id, updateAlertDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить алерт' })
  @ApiResponse({ status: 200, description: 'Алерт успешно удален' })
  remove(@Param('id') id: string) {
    return this.alertsService.remove(id);
  }
}
