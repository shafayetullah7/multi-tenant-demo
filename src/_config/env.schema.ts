// src/config/env.schema.ts
import { z } from 'zod';

export const envSchema = z
  .object({
    // === Application Settings ===
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number().default(3000),
    APP_NAME: z.string().default('my-nest-app'),

    // === CENTRAL DB ===
    CENTRAL_DB_HOST: z.string(),
    CENTRAL_DB_PORT: z.coerce.number().default(5432),
    CENTRAL_DB_USER: z.string(),
    CENTRAL_DB_PASSWORD: z.string(),
    CENTRAL_DB_NAME: z.string(),
    CENTRAL_DATABASE_URL: z.string().url().optional(),

    // === TENANT DB ===
    TENANT_DB_HOST: z.string(),
    TENANT_DB_PORT: z.coerce.number().default(5432),
    TENANT_DB_USER: z.string(),
    TENANT_DB_PASSWORD: z.string(),
    TENANT_DB_NAME: z.string(),
    TENANT_DATABASE_URL: z.string().url().optional(),

    // === Docker Compose ===
    COMPOSE_PROJECT_NAME: z.string().default('myapp'),
    APP_EXTERNAL_PORT: z.coerce.number().default(3000),

    // === Security ===
    SALT_ROUNDS: z.coerce.number().default(10),
  })
  .transform((data) => {
    // Build CENTRAL DB URL if missing
    if (!data.CENTRAL_DATABASE_URL) {
      data.CENTRAL_DATABASE_URL =
        `postgres://${data.CENTRAL_DB_USER}:${data.CENTRAL_DB_PASSWORD}` +
        `@${data.CENTRAL_DB_HOST}:${data.CENTRAL_DB_PORT}/${data.CENTRAL_DB_NAME}`;
    }

    // Build TENANT DB URL if missing
    if (!data.TENANT_DATABASE_URL) {
      data.TENANT_DATABASE_URL =
        `postgres://${data.TENANT_DB_USER}:${data.TENANT_DB_PASSWORD}` +
        `@${data.TENANT_DB_HOST}:${data.TENANT_DB_PORT}/${data.TENANT_DB_NAME}`;
    }

    return data;
  });

export type AppEnv = z.infer<typeof envSchema>;
