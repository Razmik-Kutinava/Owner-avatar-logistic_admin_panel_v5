import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.devices.findMany({
      include: {
        locations: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.devices.findUnique({
      where: { id },
      include: {
        locations: {
          orderBy: { timestamp: 'desc' },
          take: 100,
        },
      },
    });
  }

  async create(data: CreateDeviceDto) {
    return this.prisma.devices.create({
      data: {
        imei: data.imei,
        deviceType: data.deviceType,
        name: data.name,
        model: data.model,
        driverId: data.driverId,
        isActive: data.isActive ?? true,
        batteryLevel: data.batteryLevel,
        notes: data.notes,
      },
    });
  }

  async update(id: string, data: UpdateDeviceDto) {
    return this.prisma.devices.update({
      where: { id },
      data: {
        imei: data.imei,
        deviceType: data.deviceType,
        name: data.name,
        model: data.model,
        driverId: data.driverId,
        isActive: data.isActive,
        batteryLevel: data.batteryLevel,
        notes: data.notes,
        lastSeen: data.isActive ? new Date() : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.devices.delete({
      where: { id },
    });
  }

  async getDeviceLocations(deviceId: string) {
    return this.prisma.device_locations.findMany({
      where: { deviceId },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    });
  }
}
