import { PartialType } from '@nestjs/swagger';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  @ApiProperty({ description: 'Прочитан ли алерт', required: false })
  isRead?: boolean;

  @ApiProperty({ description: 'Решен ли алерт', required: false })
  isResolved?: boolean;

  @ApiProperty({ description: 'Кто решил алерт', required: false })
  resolvedBy?: string;
}
