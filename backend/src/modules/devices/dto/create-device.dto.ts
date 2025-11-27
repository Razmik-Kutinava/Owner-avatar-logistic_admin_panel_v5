import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, Min, Max } from 'class-validator';
import { device_type } from '@prisma/client';

export class CreateDeviceDto {
  @ApiProperty({ description: 'IMEI устройства' })
  @IsString()
  imei: string;

  @ApiProperty({ description: 'Тип устройства', enum: device_type })
  deviceType: device_type;

  @ApiProperty({ description: 'Название устройства' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Модель устройства' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ description: 'ID водителя' })
  @IsString()
  @IsOptional()
  driverId?: string;

  @ApiPropertyOptional({ description: 'Активно ли устройство', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Уровень батареи (0-100)' })
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  batteryLevel?: number;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;
}
