# Logistics Platform

Платформа управления логистикой с модулем управления водителями.

## Структура проекта

```
logistics-platform/
├── backend/          # NestJS Backend API
├── frontend/         # Next.js 14 Frontend
└── docs/            # Документация
```

## Backend (NestJS + Prisma)

### Технологии

- **NestJS** - фреймворк для Node.js
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - база данных (Supabase)
- **Swagger** - API документация

### Установка и запуск

1. Перейдите в директорию backend:
```bash
cd backend
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
Создайте файл `.env`:
```env
DATABASE_URL="your_supabase_database_url"
PORT=3000
FRONTEND_URL=http://localhost:3001
```

4. Подключите схему Prisma к базе данных:
```bash
npm run prisma:db:pull
npm run prisma:generate
```

5. Запустите сервер разработки:
```bash
npm run start:dev
```

Backend будет доступен на `http://localhost:3000`
Swagger документация: `http://localhost:3000/api`

### API Endpoints

- `GET /drivers` - Список всех водителей с поддоменами
- `POST /drivers` - Создание водителя со всеми данными
- `GET /drivers/:id` - Получение одного водителя по ID

## Frontend (Next.js 14)

### Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **React Hook Form** - управление формами

### Установка и запуск

1. Перейдите в директорию frontend:
```bash
cd frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
Создайте файл `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Запустите сервер разработки:
```bash
npm run dev
```

Frontend будет доступен на `http://localhost:3001`

### Страницы

- `/` - Главная страница
- `/drivers` - Список водителей и создание нового

## База данных

База данных уже создана в Supabase с следующими доменами:

### Домен DRIVER

- `drivers` - основная таблица водителей
- `driver_documents` - документы водителей
- `driver_shifts` - смены водителей
- `driver_devices` - устройства водителей
- `driver_locations` - локации водителей
- `driver_logs` - логи действий водителей

### Важно

- **НЕ создавайте миграции Prisma**, используйте только:
  - `prisma db pull` - для синхронизации схемы
  - `prisma generate` - для генерации клиента

## Функциональность

### Создание водителя

При создании водителя можно сразу указать:
1. **Основные данные** - имя, фамилия, телефон, email
2. **Документ** - тип, номер, серия, даты
3. **Смену** - начало, конец, заметки
4. **Устройство** - тип, название, серийник
5. **Локацию** - координаты

Все данные создаются в одной транзакции Prisma для обеспечения целостности данных.

Автоматически создается лог входа (action: 'login').

## Разработка

### Backend

```bash
# Запуск в режиме разработки
npm run start:dev

# Генерация Prisma клиента
npm run prisma:generate

# Prisma Studio (GUI для базы данных)
npm run prisma:studio
```

### Frontend

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сервера
npm start
```

## Лицензия

Приватный проект

