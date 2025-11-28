import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverResponseDto } from './dto/driver-response.dto';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Создать водителя со всеми данными' })
  @ApiResponse({
    status: 201,
    description: 'Водитель успешно создан',
    type: DriverResponseDto,
  })
  async create(@Body() createDriverDto: CreateDriverDto): Promise<DriverResponseDto> {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех водителей с поддоменами' })
  @ApiResponse({
    status: 200,
    description: 'Список водителей',
    type: [DriverResponseDto],
  })
  async findAll(): Promise<DriverResponseDto[]> {
    return this.driverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить одного водителя по ID' })
  @ApiResponse({
    status: 200,
    description: 'Водитель найден',
    type: DriverResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Водитель не найден',
  })
  async findOne(@Param('id') id: string): Promise<DriverResponseDto> {
    return this.driverService.findOne(id);
  }
}

