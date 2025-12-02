// src/config/services/app-config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from '../env.schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  // === Application ===
  get nodeEnv(): AppEnv['NODE_ENV'] {
    return this.configService.getOrThrow('NODE_ENV');
  }
  get port(): AppEnv['PORT'] {
    return this.configService.getOrThrow('PORT');
  }
  get appName(): AppEnv['APP_NAME'] {
    return this.configService.getOrThrow('APP_NAME');
  }

  // === CENTRAL DATABASE ===
  get centralDbHost(): AppEnv['CENTRAL_DB_HOST'] {
    return this.configService.getOrThrow('CENTRAL_DB_HOST');
  }
  get centralDbPort(): AppEnv['CENTRAL_DB_PORT'] {
    return this.configService.getOrThrow('CENTRAL_DB_PORT');
  }
  get centralDbUser(): AppEnv['CENTRAL_DB_USER'] {
    return this.configService.getOrThrow('CENTRAL_DB_USER');
  }
  get centralDbPassword(): AppEnv['CENTRAL_DB_PASSWORD'] {
    return this.configService.getOrThrow('CENTRAL_DB_PASSWORD');
  }
  get centralDbName(): AppEnv['CENTRAL_DB_NAME'] {
    return this.configService.getOrThrow('CENTRAL_DB_NAME');
  }
  get centralDbUrl(): AppEnv['CENTRAL_DATABASE_URL'] {
    return this.configService.getOrThrow('CENTRAL_DATABASE_URL');
  }

  // === TENANT DATABASE ===
  get tenantDbHost(): AppEnv['TENANT_DB_HOST'] {
    return this.configService.getOrThrow('TENANT_DB_HOST');
  }
  get tenantDbPort(): AppEnv['TENANT_DB_PORT'] {
    return this.configService.getOrThrow('TENANT_DB_PORT');
  }
  get tenantDbUser(): AppEnv['TENANT_DB_USER'] {
    return this.configService.getOrThrow('TENANT_DB_USER');
  }
  get tenantDbPassword(): AppEnv['TENANT_DB_PASSWORD'] {
    return this.configService.getOrThrow('TENANT_DB_PASSWORD');
  }
  get tenantDbName(): AppEnv['TENANT_DB_NAME'] {
    return this.configService.getOrThrow('TENANT_DB_NAME');
  }
  get tenantDbUrl(): AppEnv['TENANT_DATABASE_URL'] {
    return this.configService.getOrThrow('TENANT_DATABASE_URL');
  }

  // === Docker ===
  get composeProjectName(): AppEnv['COMPOSE_PROJECT_NAME'] {
    return this.configService.getOrThrow('COMPOSE_PROJECT_NAME');
  }
  get appExternalPort(): AppEnv['APP_EXTERNAL_PORT'] {
    return this.configService.getOrThrow('APP_EXTERNAL_PORT');
  }

  // === Security ===
  get saltRounds(): AppEnv['SALT_ROUNDS'] {
    return this.configService.getOrThrow('SALT_ROUNDS');
  }
}
