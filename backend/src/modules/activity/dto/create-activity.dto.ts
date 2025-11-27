import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { activity_action } from '@prisma/client';

export class CreateActivityDto {
  @ApiProperty({ description: 'Действие', enum: activity_action })
  action: activity_action;

  @ApiProperty({ description: 'Тип сущности' })
  @IsString()
  entityType: string;

  @ApiProperty({ description: 'ID сущности' })
  @IsString()
  entityId: string;

  @ApiPropertyOptional({ description: 'ID пользователя' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ description: 'Описание' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Метаданные (JSON)' })
  @IsOptional()
  metadata?: any;

  @ApiPropertyOptional({ description: 'IP адрес' })
  @IsString()
  @IsOptional()
  ipAddress?: string;

  @ApiPropertyOptional({ description: 'User Agent' })
  @IsString()
  @IsOptional()
  userAgent?: string;
}
