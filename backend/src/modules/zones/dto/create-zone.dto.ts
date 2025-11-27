import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateZoneDto {
  @ApiProperty({ description: 'Название зоны' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Описание зоны' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Координаты полигона (GeoJSON)' })
  @IsOptional()
  polygonCoords?: any;

  @ApiPropertyOptional({ description: 'Широта центра' })
  @IsNumber()
  @IsOptional()
  centerLat?: number;

  @ApiPropertyOptional({ description: 'Долгота центра' })
  @IsNumber()
  @IsOptional()
  centerLng?: number;

  @ApiPropertyOptional({ description: 'Радиус зоны (метры)' })
  @IsNumber()
  @IsOptional()
  radius?: number;

  @ApiPropertyOptional({ description: 'Активна ли зона', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
