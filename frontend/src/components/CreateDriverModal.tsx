'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateDriverData, createDriver } from '@/lib/api';

interface CreateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type FormData = {
  // Основное
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  birth_date?: string;
  phone: string;
  email?: string;
  telegram_id?: string;

  // Документ
  document_type?: 'license' | 'passport' | 'medical' | 'contract';
  document_number?: string;
  document_series?: string;
  document_issued_at?: string;
  document_expires_at?: string;

  // Смена
  shift_scheduled_start?: string;
  shift_scheduled_end?: string;
  shift_notes?: string;

  // Устройство
  device_type?: 'phone' | 'tablet' | 'gps_tracker';
  device_name?: string;
  device_serial_number?: string;
  device_model?: string;

  // Локация
  location_lat?: string;
  location_lng?: string;
};

export default function CreateDriverModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateDriverModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const tabs = [
    { id: 0, name: 'Основное' },
    { id: 1, name: 'Документ' },
    { id: 2, name: 'Смена' },
    { id: 3, name: 'Устройство' },
    { id: 4, name: 'Локация' },
  ];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: CreateDriverData = {
        employee_id: data.employee_id,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name || undefined,
        birth_date: data.birth_date || undefined,
        phone: data.phone,
        email: data.email || undefined,
        telegram_id: data.telegram_id || undefined,
      };

      // Документ
      if (data.document_type) {
        payload.document = {
          type: data.document_type,
          number: data.document_number || undefined,
          series: data.document_series || undefined,
          issued_at: data.document_issued_at || undefined,
          expires_at: data.document_expires_at || undefined,
        };
      }

      // Смена
      if (data.shift_scheduled_start && data.shift_scheduled_end) {
        payload.shift = {
          scheduled_start: data.shift_scheduled_start,
          scheduled_end: data.shift_scheduled_end,
          notes: data.shift_notes || undefined,
        };
      }

      // Устройство
      if (data.device_type) {
        payload.device = {
          type: data.device_type,
          name: data.device_name || undefined,
          serial_number: data.device_serial_number || undefined,
          model: data.device_model || undefined,
        };
      }

      // Локация
      if (data.location_lat && data.location_lng) {
        payload.location = {
          lat: parseFloat(data.location_lat),
          lng: parseFloat(data.location_lng),
        };
      }

      await createDriver(payload);
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при создании водителя');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Создать водителя</h2>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto">
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Основное */}
            {activeTab === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID сотрудника *
                  </label>
                  <input
                    {...register('employee_id', { required: 'Обязательное поле' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.employee_id && (
                    <p className="text-red-500 text-xs mt-1">{errors.employee_id.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя *
                  </label>
                  <input
                    {...register('first_name', { required: 'Обязательное поле' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Фамилия *
                  </label>
                  <input
                    {...register('last_name', { required: 'Обязательное поле' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Отчество
                  </label>
                  <input
                    {...register('middle_name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата рождения
                  </label>
                  <input
                    type="date"
                    {...register('birth_date')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    {...register('phone', { required: 'Обязательное поле' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telegram ID
                  </label>
                  <input
                    {...register('telegram_id')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Документ */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип документа
                  </label>
                  <select
                    {...register('document_type')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Выберите тип</option>
                    <option value="license">Водительские права</option>
                    <option value="passport">Паспорт</option>
                    <option value="medical">Медсправка</option>
                    <option value="contract">Договор</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Номер
                  </label>
                  <input
                    {...register('document_number')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Серия
                  </label>
                  <input
                    {...register('document_series')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата выдачи
                  </label>
                  <input
                    type="date"
                    {...register('document_issued_at')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Срок действия
                  </label>
                  <input
                    type="date"
                    {...register('document_expires_at')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Смена */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Начало смены
                  </label>
                  <input
                    type="datetime-local"
                    {...register('shift_scheduled_start')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Конец смены
                  </label>
                  <input
                    type="datetime-local"
                    {...register('shift_scheduled_end')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Заметки
                  </label>
                  <textarea
                    {...register('shift_notes')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Устройство */}
            {activeTab === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип устройства
                  </label>
                  <select
                    {...register('device_type')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Выберите тип</option>
                    <option value="phone">Телефон</option>
                    <option value="tablet">Планшет</option>
                    <option value="gps_tracker">GPS трекер</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название
                  </label>
                  <input
                    {...register('device_name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Серийный номер
                  </label>
                  <input
                    {...register('device_serial_number')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Модель
                  </label>
                  <input
                    {...register('device_model')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Локация */}
            {activeTab === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Широта (lat)
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register('location_lat')}
                    placeholder="55.7558"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Долгота (lng)
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...register('location_lng')}
                    placeholder="37.6173"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Пример: Москва - lat: 55.7558, lng: 37.6173
                </p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Создание...' : 'Создать водителя'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

