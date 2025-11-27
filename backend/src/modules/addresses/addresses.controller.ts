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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('addresses')
@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать адрес' })
  @ApiResponse({ status: 201, description: 'Адрес успешно создан' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все адреса' })
  @ApiResponse({ status: 200, description: 'Список адресов' })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить адрес по ID' })
  @ApiResponse({ status: 200, description: 'Данные адреса' })
  @ApiResponse({ status: 404, description: 'Адрес не найден' })
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить адрес' })
  @ApiResponse({ status: 200, description: 'Адрес успешно обновлен' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить адрес' })
  @ApiResponse({ status: 200, description: 'Адрес успешно удален' })
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
