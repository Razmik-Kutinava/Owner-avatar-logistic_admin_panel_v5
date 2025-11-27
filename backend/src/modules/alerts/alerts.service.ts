import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.alerts.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.alerts.findUnique({
      where: { id },
    });
  }

  async create(data: CreateAlertDto) {
    return this.prisma.alerts.create({
      data: {
        alertType: data.alertType,
        severity: data.severity,
        title: data.title,
        message: data.message,
        driverId: data.driverId,
        deviceId: data.deviceId,
        orderId: data.orderId,
        routeId: data.routeId,
        metadata: data.metadata,
      },
    });
  }

  async update(id: string, data: UpdateAlertDto) {
    const updateData: any = {
      alertType: data.alertType,
      severity: data.severity,
      title: data.title,
      message: data.message,
      driverId: data.driverId,
      deviceId: data.deviceId,
      orderId: data.orderId,
      routeId: data.routeId,
      metadata: data.metadata,
      isRead: data.isRead,
      isResolved: data.isResolved,
      resolvedBy: data.resolvedBy,
    };

    if (data.isResolved && !updateData.resolvedAt) {
      updateData.resolvedAt = new Date();
    }

    return this.prisma.alerts.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.alerts.delete({
      where: { id },
    });
  }
}
