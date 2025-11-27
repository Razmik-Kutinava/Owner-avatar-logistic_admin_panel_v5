import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.drivers.findMany({
      include: {
        documents: true,
        shifts: true,
        driver_zones: {
          include: {
            zone: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.drivers.findUnique({
      where: { id },
      include: {
        documents: true,
        shifts: true,
        driver_zones: {
          include: {
            zone: true,
          },
        },
      },
    });
  }

  async create(data: CreateDriverDto) {
    return this.prisma.drivers.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        licenseNumber: data.licenseNumber,
        status: data.status,
        isActive: data.isActive ?? true,
        notes: data.notes,
      },
    });
  }

  async update(id: string, data: UpdateDriverDto) {
    return this.prisma.drivers.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        licenseNumber: data.licenseNumber,
        status: data.status,
        isActive: data.isActive,
        notes: data.notes,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.drivers.delete({
      where: { id },
    });
  }

  async getDriverDocuments(driverId: string) {
    return this.prisma.driver_documents.findMany({
      where: { driverId },
    });
  }

  async getDriverShifts(driverId: string) {
    return this.prisma.driver_shifts.findMany({
      where: { driverId },
      orderBy: { startTime: 'desc' },
    });
  }
}
