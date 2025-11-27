import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZonesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.zones.findMany({
      include: {
        driver_zones: {
          include: {
            driver: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.zones.findUnique({
      where: { id },
      include: {
        driver_zones: {
          include: {
            driver: true,
          },
        },
      },
    });
  }

  async create(data: CreateZoneDto) {
    return this.prisma.zones.create({
      data: {
        name: data.name,
        description: data.description,
        polygonCoords: data.polygonCoords,
        centerLat: data.centerLat,
        centerLng: data.centerLng,
        radius: data.radius,
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: UpdateZoneDto) {
    return this.prisma.zones.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        polygonCoords: data.polygonCoords,
        centerLat: data.centerLat,
        centerLng: data.centerLng,
        radius: data.radius,
        isActive: data.isActive,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.zones.delete({
      where: { id },
    });
  }
}
