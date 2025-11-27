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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все заказы' })
  @ApiResponse({ status: 200, description: 'Список заказов' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiResponse({ status: 200, description: 'Данные заказа' })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить заказ' })
  @ApiResponse({ status: 200, description: 'Заказ успешно обновлен' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заказ' })
  @ApiResponse({ status: 200, description: 'Заказ успешно удален' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Get(':id/items')
  @ApiOperation({ summary: 'Получить товары заказа' })
  @ApiResponse({ status: 200, description: 'Список товаров' })
  getItems(@Param('id') id: string) {
    return this.ordersService.getOrderItems(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Получить историю статусов заказа' })
  @ApiResponse({ status: 200, description: 'История статусов' })
  getStatusHistory(@Param('id') id: string) {
    return this.ordersService.getOrderStatusHistory(id);
  }
}
