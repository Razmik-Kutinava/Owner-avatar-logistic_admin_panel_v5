# Logistics Platform

Платформа управления логистикой с модулем управления водителями.

## Быстрый старт

### Backend

```bash
cd backend
npm install
# Создайте .env файл с DATABASE_URL
npm run prisma:db:pull
npm run prisma:generate
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
# Создайте .env.local файл с NEXT_PUBLIC_API_URL=http://localhost:3000
npm run dev
```

Подробная документация в [docs/README.md](docs/README.md)

