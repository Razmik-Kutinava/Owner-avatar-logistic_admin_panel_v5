# Настройка Connection String для Supabase

## Проблема с подключением

Если вы получаете ошибку "FATAL: Tenant or user not found", нужно проверить правильность Connection String.

## Как получить правильный Connection String

1. Откройте **Supabase Dashboard** → ваш проект
2. Перейдите в **Settings** → **Database**
3. Найдите секцию **Connection string**
4. Скопируйте **URI** в режиме **Session mode** (не Transaction mode)
5. Вставьте его в `.env` файл как значение `DATABASE_URL`

## Формат Connection String

Правильный формат для Prisma `db pull`:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

Или для pooler в Session mode:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
```

## Текущие данные проекта

- Project URL: `https://otsxwixpvqxxdjaxtpkt.supabase.co`
- Project REF: `otsxwixpvqxxdjaxtpkt`
- Region: `eu-west-1`
- Password: `1ur595X6UsPizzdQ`

## Попробуйте следующие варианты:

### Вариант 1: Прямое подключение (рекомендуется для db pull)
```
postgresql://postgres:1ur595X6UsPizzdQ@db.otsxwixpvqxxdjaxtpkt.supabase.co:5432/postgres
```

### Вариант 2: Pooler Session mode
```
postgresql://postgres.otsxwixpvqxxdjaxtpkt:1ur595X6UsPizzdQ@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**ВАЖНО:** Лучше всего скопировать Connection String напрямую из Supabase Dashboard!

