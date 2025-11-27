import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { order_status } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.orders.findMany({
      include: {
        driver: true,
        address: true,
        items: true,
        status_history: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.orders.findUnique({
      where: { id },
      include: {
        driver: true,
        address: true,
        items: true,
        status_history: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(data: CreateOrderDto) {
    const items = data.items?.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.quantity * item.unitPrice,
      notes: item.notes,
    }));

    const order = await this.prisma.orders.create({
      data: {
        orderNumber: data.orderNumber,
        driverId: data.driverId,
        addressId: data.addressId,
        status: data.status ?? order_status.pending,
        totalAmount: data.totalAmount,
        deliveryFee: data.deliveryFee,
        scheduledDelivery: data.scheduledDelivery ? new Date(data.scheduledDelivery) : null,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        notes: data.notes,
        items: items ? { create: items } : undefined,
        status_history: {
          create: {
            status: data.status ?? order_status.pending,
            notes: 'Заказ создан',
          },
        },
      },
      include: {
        items: true,
        status_history: true,
      },
    });

    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    const updateData: any = {
      driverId: data.driverId,
      addressId: data.addressId,
      totalAmount: data.totalAmount,
      deliveryFee: data.deliveryFee,
      scheduledDelivery: data.scheduledDelivery ? new Date(data.scheduledDelivery) : undefined,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      notes: data.notes,
    };

    if (data.status) {
      updateData.status = data.status;
      updateData.status_history = {
        create: {
          status: data.status,
          notes: 'Статус изменен',
        },
      };
    }

    return this.prisma.orders.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
        status_history: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.orders.delete({
      where: { id },
    });
  }

  async getOrderItems(orderId: string) {
    return this.prisma.order_items.findMany({
      where: { orderId },
    });
  }

  async getOrderStatusHistory(orderId: string) {
    return this.prisma.order_status_history.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
