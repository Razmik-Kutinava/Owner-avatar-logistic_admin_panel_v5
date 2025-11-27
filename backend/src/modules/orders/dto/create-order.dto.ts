import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { order_status } from '@prisma/client';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Название товара' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Количество', default: 1 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Цена за единицу' })
  @IsNumber()
  unitPrice: number;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Номер заказа' })
  @IsString()
  orderNumber: string;

  @ApiPropertyOptional({ description: 'ID водителя' })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiProperty({ description: 'ID адреса' })
  @IsString()
  addressId: string;

  @ApiPropertyOptional({ description: 'Статус заказа', enum: order_status, default: order_status.pending })
  @IsOptional()
  status?: order_status;

  @ApiProperty({ description: 'Общая сумма' })
  @IsNumber()
  totalAmount: number;

  @ApiPropertyOptional({ description: 'Стоимость доставки' })
  @IsNumber()
  @IsOptional()
  deliveryFee?: number;

  @ApiPropertyOptional({ description: 'Запланированная дата доставки' })
  @IsDateString()
  @IsOptional()
  scheduledDelivery?: string;

  @ApiPropertyOptional({ description: 'Имя клиента' })
  @IsString()
  @IsOptional()
  customerName?: string;

  @ApiPropertyOptional({ description: 'Телефон клиента' })
  @IsString()
  @IsOptional()
  customerPhone?: string;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Товары заказа', type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsOptional()
  items?: CreateOrderItemDto[];
}
