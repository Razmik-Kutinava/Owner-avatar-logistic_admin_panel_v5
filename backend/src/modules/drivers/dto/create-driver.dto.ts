import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { driver_status } from '@prisma/client';

export class CreateDriverDto {
  @ApiProperty({ description: 'Имя водителя' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Номер телефона' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: 'Email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Номер водительского удостоверения' })
  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @ApiPropertyOptional({ description: 'Статус водителя', enum: driver_status, default: driver_status.available })
  @IsOptional()
  status?: driver_status;

  @ApiPropertyOptional({ description: 'Активен ли водитель', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;
}
