import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { DevicesModule } from './modules/devices/devices.module';
import { ZonesModule } from './modules/zones/zones.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RoutesModule } from './modules/routes/routes.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DriversModule,
    DevicesModule,
    ZonesModule,
    AddressesModule,
    OrdersModule,
    RoutesModule,
    AlertsModule,
    ActivityModule,
  ],
})
export class AppModule {}
