import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverResponseDto } from './dto/driver-response.dto';

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto): Promise<DriverResponseDto> {
    return await this.prisma.$transaction(async (tx) => {
      // Создаем основного водителя
      const driver = await tx.drivers.create({
        data: {
          employee_id: createDriverDto.employee_id,
          first_name: createDriverDto.first_name,
          last_name: createDriverDto.last_name,
          middle_name: createDriverDto.middle_name,
          birth_date: createDriverDto.birth_date
            ? new Date(createDriverDto.birth_date)
            : null,
          phone: createDriverDto.phone,
          email: createDriverDto.email,
          telegram_id: createDriverDto.telegram_id,
        },
      });

      // Создаем документ, если передан
      if (createDriverDto.document) {
        await tx.driver_documents.create({
          data: {
            driver_id: driver.id,
            type: createDriverDto.document.type,
            number: createDriverDto.document.number,
            series: createDriverDto.document.series,
            issued_at: createDriverDto.document.issued_at
              ? new Date(createDriverDto.document.issued_at)
              : null,
            expires_at: createDriverDto.document.expires_at
              ? new Date(createDriverDto.document.expires_at)
              : null,
          },
        });
      }

      // Создаем смену, если передана
      let shiftId: string | null = null;
      if (createDriverDto.shift) {
        const shift = await tx.driver_shifts.create({
          data: {
            driver_id: driver.id,
            scheduled_start: new Date(createDriverDto.shift.scheduled_start),
            scheduled_end: new Date(createDriverDto.shift.scheduled_end),
            notes: createDriverDto.shift.notes,
          },
        });
        shiftId = shift.id;
      }

      // Создаем устройство, если передано
      let deviceId: string | null = null;
      if (createDriverDto.device) {
        const device = await tx.driver_devices.create({
          data: {
            driver_id: driver.id,
            type: createDriverDto.device.type,
            name: createDriverDto.device.name,
            serial_number: createDriverDto.device.serial_number,
            model: createDriverDto.device.model,
          },
        });
        deviceId = device.id;
      }

      // Создаем локацию, если передана
      if (createDriverDto.location) {
        await tx.driver_locations.create({
          data: {
            driver_id: driver.id,
            device_id: deviceId,
            shift_id: shiftId,
            lat: createDriverDto.location.lat,
            lng: createDriverDto.location.lng,
            recorded_at: new Date(),
          },
        });
      }

      // Создаем лог входа (автоматически)
      await tx.driver_logs.create({
        data: {
          driver_id: driver.id,
          device_id: deviceId,
          action: 'login',
        },
      });

      // Возвращаем водителя со всеми связанными данными
      return await this.findOne(driver.id);
    });
  }

  async findAll(): Promise<DriverResponseDto[]> {
    const drivers = await this.prisma.drivers.findMany({
      include: {
        documents: true,
        shifts: true,
        devices: true,
        locations: {
          orderBy: {
            recorded_at: 'desc',
          },
          take: 1, // Последняя локация
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return drivers.map(this.mapToResponseDto);
  }

  async findOne(id: string): Promise<DriverResponseDto> {
    const driver = await this.prisma.drivers.findUnique({
      where: { id },
      include: {
        documents: true,
        shifts: true,
        devices: true,
        locations: {
          orderBy: {
            recorded_at: 'desc',
          },
          take: 10, // Последние 10 локаций
        },
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return this.mapToResponseDto(driver);
  }

  private mapToResponseDto(driver: any): DriverResponseDto {
    return {
      id: driver.id,
      employee_id: driver.employee_id,
      first_name: driver.first_name,
      last_name: driver.last_name,
      middle_name: driver.middle_name,
      birth_date: driver.birth_date,
      phone: driver.phone,
      email: driver.email,
      telegram_id: driver.telegram_id,
      status: driver.status,
      is_active: driver.is_active,
      photo_url: driver.photo_url,
      hired_at: driver.hired_at,
      notes: driver.notes,
      documents: driver.documents,
      shifts: driver.shifts,
      devices: driver.devices,
      locations: driver.locations,
      created_at: driver.created_at,
      updated_at: driver.updated_at,
    };
  }
}

