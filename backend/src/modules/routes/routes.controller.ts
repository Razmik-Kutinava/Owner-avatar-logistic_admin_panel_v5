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
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@ApiTags('routes')
@Controller('api/routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать маршрут' })
  @ApiResponse({ status: 201, description: 'Маршрут успешно создан' })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все маршруты' })
  @ApiResponse({ status: 200, description: 'Список маршрутов' })
  findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить маршрут по ID' })
  @ApiResponse({ status: 200, description: 'Данные маршрута' })
  @ApiResponse({ status: 404, description: 'Маршрут не найден' })
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить маршрут' })
  @ApiResponse({ status: 200, description: 'Маршрут успешно обновлен' })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить маршрут' })
  @ApiResponse({ status: 200, description: 'Маршрут успешно удален' })
  remove(@Param('id') id: string) {
    return this.routesService.remove(id);
  }

  @Get(':id/points')
  @ApiOperation({ summary: 'Получить точки маршрута' })
  @ApiResponse({ status: 200, description: 'Список точек маршрута' })
  getPoints(@Param('id') id: string) {
    return this.routesService.getRoutePoints(id);
  }
}
