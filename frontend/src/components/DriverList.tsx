'use client';

import { Driver } from '@/lib/api';
import DriverCard from './DriverCard';

interface DriverListProps {
  drivers: Driver[];
}

export default function DriverList({ drivers }: DriverListProps) {
  if (drivers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Водители не найдены</p>
        <p className="text-gray-400 text-sm mt-2">
          Создайте первого водителя, чтобы начать работу
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {drivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

