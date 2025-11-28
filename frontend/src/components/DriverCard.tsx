'use client';

import { Driver } from '@/lib/api';

interface DriverCardProps {
  driver: Driver;
}

const statusColors: Record<string, string> = {
  available: 'bg-green-100 text-green-800',
  on_route: 'bg-blue-100 text-blue-800',
  break: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800',
};

export default function DriverCard({ driver }: DriverCardProps) {
  const statusColor = statusColors[driver.status] || statusColors.offline;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {driver.last_name} {driver.first_name}
            {driver.middle_name && ` ${driver.middle_name}`}
          </h3>
          <p className="text-sm text-gray-500 mt-1">ID: {driver.employee_id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {driver.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="font-medium w-20">Телефон:</span>
          <span>{driver.phone}</span>
        </div>
        {driver.email && (
          <div className="flex items-center">
            <span className="font-medium w-20">Email:</span>
            <span>{driver.email}</span>
          </div>
        )}
      </div>

      {(driver.documents?.length > 0 ||
        driver.shifts?.length > 0 ||
        driver.devices?.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-4 text-xs text-gray-500">
          {driver.documents && driver.documents.length > 0 && (
            <span>Документов: {driver.documents.length}</span>
          )}
          {driver.shifts && driver.shifts.length > 0 && (
            <span>Смен: {driver.shifts.length}</span>
          )}
          {driver.devices && driver.devices.length > 0 && (
            <span>Устройств: {driver.devices.length}</span>
          )}
        </div>
      )}
    </div>
  );
}

