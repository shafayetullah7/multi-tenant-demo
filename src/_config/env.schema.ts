// src/config/env.schema.ts
import { z } from 'zod';

export const envSchema = z
  .object({
    // === Application Settings ===
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number().default(3000),
    APP_NAME: z.string().default('my-nest-app'),

    // === CENTRAL DB ===
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DATABASE_URL: z.string().url().optional(),

    // === Docker Compose ===
    COMPOSE_PROJECT_NAME: z.string().default('myapp'),
    APP_EXTERNAL_PORT: z.coerce.number().default(3000),

    // === Security ===
    SALT_ROUNDS: z.coerce.number().default(10),
  })
  .transform((data) => {
    // Build CENTRAL DB URL if missing
    if (!data.DATABASE_URL) {
      data.DATABASE_URL =
        `postgres://${data.DB_USER}:${data.DB_PASSWORD}` +
        `@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}`;
    }

    return data;
  });

export type AppEnv = z.infer<typeof envSchema>;
