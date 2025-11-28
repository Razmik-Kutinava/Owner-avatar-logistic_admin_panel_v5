import {
  IsString,
  IsEmail,
  IsOptional,
  IsObject,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentDto {
  @ApiProperty({ enum: ['license', 'passport', 'medical', 'contract'] })
  @IsEnum(['license', 'passport', 'medical', 'contract'])
  type: 'license' | 'passport' | 'medical' | 'contract';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  series?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  issued_at?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expires_at?: string;
}

export class ShiftDto {
  @ApiProperty()
  @IsDateString()
  scheduled_start: string;

  @ApiProperty()
  @IsDateString()
  scheduled_end: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class DeviceDto {
  @ApiProperty({ enum: ['phone', 'tablet', 'gps_tracker'] })
  @IsEnum(['phone', 'tablet', 'gps_tracker'])
  type: 'phone' | 'tablet' | 'gps_tracker';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serial_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model?: string;
}

export class LocationDto {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}

export class CreateDriverDto {
  @ApiProperty()
  @IsString()
  employee_id: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  middle_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telegram_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => DocumentDto)
  @IsObject()
  document?: DocumentDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => ShiftDto)
  @IsObject()
  shift?: ShiftDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => DeviceDto)
  @IsObject()
  device?: DeviceDto;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  @IsObject()
  location?: LocationDto;
}

