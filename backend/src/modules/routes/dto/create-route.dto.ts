import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { route_status } from '@prisma/client';

export class CreateRoutePointDto {
  @ApiProperty({ description: 'ID адреса' })
  @IsString()
  addressId: string;

  @ApiProperty({ description: 'Порядковый номер точки' })
  @IsNumber()
  sequence: number;

  @ApiPropertyOptional({ description: 'Запланированное время прибытия' })
  @IsDateString()
  @IsOptional()
  plannedArrival?: string;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateRouteDto {
  @ApiProperty({ description: 'Номер маршрута' })
  @IsString()
  routeNumber: string;

  @ApiProperty({ description: 'ID водителя' })
  @IsString()
  driverId: string;

  @ApiPropertyOptional({ description: 'Статус маршрута', enum: route_status, default: route_status.planned })
  @IsOptional()
  status?: route_status;

  @ApiProperty({ description: 'Запланированное время начала' })
  @IsDateString()
  plannedStart: string;

  @ApiPropertyOptional({ description: 'Запланированное время окончания' })
  @IsDateString()
  @IsOptional()
  plannedEnd?: string;

  @ApiPropertyOptional({ description: 'Общая дистанция (км)' })
  @IsNumber()
  @IsOptional()
  totalDistance?: number;

  @ApiPropertyOptional({ description: 'Общая длительность (минуты)' })
  @IsNumber()
  @IsOptional()
  totalDuration?: number;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Точки маршрута', type: [CreateRoutePointDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutePointDto)
  @IsOptional()
  points?: CreateRoutePointDto[];
}
