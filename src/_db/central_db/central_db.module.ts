import { Global, Module } from '@nestjs/common';
import { AppConfigService } from 'src/_config/app-config/app-config.service';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './tables';
import { CENTRAL_DB } from './constants/drizzle.token';
import { CentralDB } from './central_db.service';

@Global()
@Module({
  providers: [
    {
      provide: CENTRAL_DB,
      inject: [AppConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: AppConfigService) => {
        const dbHost = configService.centralDbHost;
        const dbPort = configService.centralDbPort;
        const dbUser = configService.centralDbUser;
        const dbPass = configService.centralDbPassword;
        const dbName = configService.centralDbName;

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
    CentralDB,
  ],
  exports: [CentralDB],
})
export class CentralDbModule {}
