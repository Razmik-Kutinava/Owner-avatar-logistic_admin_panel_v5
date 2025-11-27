import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { route_status } from '@prisma/client';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.routes.findMany({
      include: {
        driver: true,
        points: {
          include: {
            address: true,
          },
          orderBy: { sequence: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.routes.findUnique({
      where: { id },
      include: {
        driver: true,
        points: {
          include: {
            address: true,
          },
          orderBy: { sequence: 'asc' },
        },
      },
    });
  }

  async create(data: CreateRouteDto) {
    const points = data.points?.map((point) => ({
      addressId: point.addressId,
      sequence: point.sequence,
      plannedArrival: point.plannedArrival ? new Date(point.plannedArrival) : null,
      notes: point.notes,
    }));

    return this.prisma.routes.create({
      data: {
        routeNumber: data.routeNumber,
        driverId: data.driverId,
        status: data.status ?? route_status.planned,
        plannedStart: new Date(data.plannedStart),
        plannedEnd: data.plannedEnd ? new Date(data.plannedEnd) : null,
        totalDistance: data.totalDistance,
        totalDuration: data.totalDuration,
        notes: data.notes,
        points: points ? { create: points } : undefined,
      },
      include: {
        points: {
          include: {
            address: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateRouteDto) {
    const updateData: any = {
      driverId: data.driverId,
      plannedStart: data.plannedStart ? new Date(data.plannedStart) : undefined,
      plannedEnd: data.plannedEnd ? new Date(data.plannedEnd) : undefined,
      totalDistance: data.totalDistance,
      totalDuration: data.totalDuration,
      notes: data.notes,
    };

    if (data.status === route_status.active && !updateData.actualStart) {
      updateData.actualStart = new Date();
    }

    if (data.status === route_status.completed && !updateData.actualEnd) {
      updateData.actualEnd = new Date();
    }

    if (data.status) {
      updateData.status = data.status;
    }

    return this.prisma.routes.update({
      where: { id },
      data: updateData,
      include: {
        points: {
          include: {
            address: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.routes.delete({
      where: { id },
    });
  }

  async getRoutePoints(routeId: string) {
    return this.prisma.route_points.findMany({
      where: { routeId },
      include: {
        address: true,
      },
      orderBy: { sequence: 'asc' },
    });
  }
}
