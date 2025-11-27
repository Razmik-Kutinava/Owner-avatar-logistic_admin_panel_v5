# Logistics Platform

Платформа для управления логистикой с поддержкой водителей, устройств, зон, адресов, заказов, маршрутов, алертов и активности.

## Структура проекта

- `backend/` - NestJS backend приложение
- `frontend/` - SolidJS frontend приложение
- `supabase/` - Миграции и seed данные для Supabase
- `docs/` - Документация проекта
- `mcp-servers/` - MCP серверы для проекта
- `scripts/` - Вспомогательные скрипты

## Технологии

### Backend
- NestJS
- Prisma
- TypeScript

### Frontend
- SolidJS
- Vite
- TailwindCSS

## Установка

```bash
# Установка зависимостей
npm install

# Запуск backend
cd backend
npm run start:dev

# Запуск frontend
cd frontend
npm run dev
```

## Документация

Подробная документация находится в папке `docs/`.
