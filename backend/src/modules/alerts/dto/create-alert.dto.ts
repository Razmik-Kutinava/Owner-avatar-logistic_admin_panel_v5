import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { alert_type, alert_severity } from '@prisma/client';

export class CreateAlertDto {
  @ApiProperty({ description: 'Тип алерта', enum: alert_type })
  alertType: alert_type;

  @ApiPropertyOptional({ description: 'Уровень важности', enum: alert_severity, default: alert_severity.info })
  @IsOptional()
  severity?: alert_severity;

  @ApiProperty({ description: 'Заголовок алерта' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Сообщение алерта' })
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'ID водителя' })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiPropertyOptional({ description: 'ID устройства' })
  @IsString()
  @IsOptional()
  deviceId?: string;

  @ApiPropertyOptional({ description: 'ID заказа' })
  @IsString()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({ description: 'ID маршрута' })
  @IsString()
  @IsOptional()
  routeId?: string;

  @ApiPropertyOptional({ description: 'Метаданные (JSON)' })
  @IsOptional()
  metadata?: any;
}
