import { Global, Module } from '@nestjs/common';
import { TenantDB } from './tenant.db.service';
import { AppConfigService } from 'src/_config/app-config/app-config.service';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { TENANT_DB } from './constants/drizzle.token';
import * as schema from './tables';

@Global()
@Module({
  providers: [
    {
      provide: TENANT_DB,
      inject: [AppConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: AppConfigService) => {
        const dbHost = configService.tenantDbHost;
        const dbPort = configService.tenantDbPort;
        const dbUser = configService.tenantDbUser;
        const dbPass = configService.tenantDbPassword;
        const dbName = configService.tenantDbName;

        const pool = new Pool({
          //   connectionString,
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
          // logger: configService.get('NODE_ENV') !== 'production', // Enable SQL logging in dev
        }) as NodePgDatabase<typeof schema>;
      },
    },
    TenantDB,
  ],
  exports: [TenantDB],
})
export class TenantDbModule {}
