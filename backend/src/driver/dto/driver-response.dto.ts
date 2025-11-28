import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DriverDocumentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  number?: string;

  @ApiPropertyOptional()
  series?: string;

  @ApiPropertyOptional()
  issued_at?: Date;

  @ApiPropertyOptional()
  expires_at?: Date;

  @ApiPropertyOptional()
  file_url?: string;
}

export class DriverShiftResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  scheduled_start: Date;

  @ApiProperty()
  scheduled_end: Date;

  @ApiPropertyOptional()
  actual_start?: Date;

  @ApiPropertyOptional()
  actual_end?: Date;

  @ApiProperty()
  total_orders: number;

  @ApiProperty()
  completed_orders: number;
}

export class DriverDeviceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  serial_number?: string;

  @ApiPropertyOptional()
  model?: string;

  @ApiProperty()
  is_active: boolean;
}

export class DriverLocationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

  @ApiPropertyOptional()
  speed?: number;

  @ApiProperty()
  recorded_at: Date;
}

export class DriverResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiPropertyOptional()
  middle_name?: string;

  @ApiPropertyOptional()
  birth_date?: Date;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  telegram_id?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  is_active: boolean;

  @ApiPropertyOptional()
  photo_url?: string;

  @ApiPropertyOptional()
  hired_at?: Date;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty({ type: [DriverDocumentResponseDto], required: false })
  documents?: DriverDocumentResponseDto[];

  @ApiProperty({ type: [DriverShiftResponseDto], required: false })
  shifts?: DriverShiftResponseDto[];

  @ApiProperty({ type: [DriverDeviceResponseDto], required: false })
  devices?: DriverDeviceResponseDto[];

  @ApiProperty({ type: [DriverLocationResponseDto], required: false })
  locations?: DriverLocationResponseDto[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

