const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Driver {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email?: string;
  status: string;
  is_active: boolean;
  documents?: DriverDocument[];
  shifts?: DriverShift[];
  devices?: DriverDevice[];
  locations?: DriverLocation[];
  created_at: string;
  updated_at: string;
}

export interface DriverDocument {
  id: string;
  type: string;
  status: string;
  number?: string;
  series?: string;
}

export interface DriverShift {
  id: string;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
}

export interface DriverDevice {
  id: string;
  type: string;
  name?: string;
  serial_number?: string;
}

export interface DriverLocation {
  id: string;
  lat: number;
  lng: number;
  recorded_at: string;
}

export interface CreateDriverData {
  employee_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  birth_date?: string;
  phone: string;
  email?: string;
  telegram_id?: string;
  document?: {
    type: 'license' | 'passport' | 'medical' | 'contract';
    number?: string;
    series?: string;
    issued_at?: string;
    expires_at?: string;
  };
  shift?: {
    scheduled_start: string;
    scheduled_end: string;
    notes?: string;
  };
  device?: {
    type: 'phone' | 'tablet' | 'gps_tracker';
    name?: string;
    serial_number?: string;
    model?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}

export async function fetchDrivers(): Promise<Driver[]> {
  const response = await fetch(`${API_BASE_URL}/drivers`);
  if (!response.ok) {
    throw new Error('Failed to fetch drivers');
  }
  return response.json();
}

export async function fetchDriver(id: string): Promise<Driver> {
  const response = await fetch(`${API_BASE_URL}/drivers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch driver');
  }
  return response.json();
}

export async function createDriver(data: CreateDriverData): Promise<Driver> {
  const response = await fetch(`${API_BASE_URL}/drivers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create driver');
  }
  return response.json();
}

