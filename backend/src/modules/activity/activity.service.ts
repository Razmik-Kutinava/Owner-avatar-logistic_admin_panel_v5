import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.activity_logs.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
  }

  async findOne(id: string) {
    return this.prisma.activity_logs.findUnique({
      where: { id },
    });
  }

  async create(data: CreateActivityDto) {
    return this.prisma.activity_logs.create({
      data: {
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        userId: data.userId,
        description: data.description,
        metadata: data.metadata,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async update(id: string, data: UpdateActivityDto) {
    return this.prisma.activity_logs.update({
      where: { id },
      data: {
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        userId: data.userId,
        description: data.description,
        metadata: data.metadata,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.activity_logs.delete({
      where: { id },
    });
  }

  async findByEntity(entityType: string, entityId: string) {
    return this.prisma.activity_logs.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
