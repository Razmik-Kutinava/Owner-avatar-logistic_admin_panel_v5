import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activity')
@Controller('api/activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Создать запись активности' })
  @ApiResponse({ status: 201, description: 'Запись активности успешно создана' })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все записи активности' })
  @ApiResponse({ status: 200, description: 'Список записей активности' })
  findAll() {
    return this.activityService.findAll();
  }

  @Get('entity')
  @ApiOperation({ summary: 'Получить записи активности по сущности' })
  @ApiQuery({ name: 'entityType', required: true, description: 'Тип сущности' })
  @ApiQuery({ name: 'entityId', required: true, description: 'ID сущности' })
  @ApiResponse({ status: 200, description: 'Список записей активности' })
  findByEntity(
    @Query('entityType') entityType: string,
    @Query('entityId') entityId: string,
  ) {
    return this.activityService.findByEntity(entityType, entityId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись активности по ID' })
  @ApiResponse({ status: 200, description: 'Данные записи активности' })
  @ApiResponse({ status: 404, description: 'Запись активности не найдена' })
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить запись активности' })
  @ApiResponse({ status: 200, description: 'Запись активности успешно обновлена' })
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить запись активности' })
  @ApiResponse({ status: 200, description: 'Запись активности успешно удалена' })
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
