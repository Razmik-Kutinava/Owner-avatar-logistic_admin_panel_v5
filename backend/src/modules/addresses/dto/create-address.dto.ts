import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Улица' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Город' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ description: 'Регион/Область' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: 'Почтовый индекс' })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Страна', default: 'RU' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ description: 'Широта' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Долгота' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ description: 'Номер дома' })
  @IsString()
  @IsOptional()
  buildingNumber?: string;

  @ApiPropertyOptional({ description: 'Квартира/Офис' })
  @IsString()
  @IsOptional()
  apartment?: string;

  @ApiPropertyOptional({ description: 'Заметки' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Активен ли адрес', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
