import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.addresses.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.addresses.findUnique({
      where: { id },
    });
  }

  async create(data: CreateAddressDto) {
    return this.prisma.addresses.create({
      data: {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country ?? 'RU',
        latitude: data.latitude,
        longitude: data.longitude,
        buildingNumber: data.buildingNumber,
        apartment: data.apartment,
        notes: data.notes,
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: UpdateAddressDto) {
    return this.prisma.addresses.update({
      where: { id },
      data: {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        buildingNumber: data.buildingNumber,
        apartment: data.apartment,
        notes: data.notes,
        isActive: data.isActive,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.addresses.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
