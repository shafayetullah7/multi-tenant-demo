import { Global, Module } from '@nestjs/common';
import { AppConfigService } from 'src/_config/app-config/app-config.service';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './tables';
import { CENTRAL_DB } from './constants/drizzle.token';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  providers: [
    {
      provide: CENTRAL_DB,
      inject: [AppConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: AppConfigService) => {
        const dbHost = configService.dbHost;
        const dbPort = configService.dbPort;
        const dbUser = configService.dbUser;
        const dbPass = configService.dbPassword;
        const dbName = configService.dbName;

        const pool = new Pool({
          host: dbHost,
          port: dbPort,
          user: dbUser,
          password: dbPass,
          database: dbName,
          ssl:
            configService.nodeEnv === 'production'
              ? { rejectUnauthorized: false }
              : false,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        });

        pool.on('error', (err) => {
          console.error('PostgreSQL pool error:', err);
        });

        return drizzle(pool, {
          schema,
        }) as NodePgDatabase<typeof schema>;
      },
    },
    DrizzleService,
  ],
  exports: [DrizzleService],
})
export class CentralDbModule {}
