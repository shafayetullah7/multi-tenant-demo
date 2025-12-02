import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './_config/app-config/app-config.module';
import { TenantDbModule } from './_db/tenant_db/tenant.db.module';
import { OrganizationRepositoryModule } from './repositories/organization-repository/organization-repository.module';
import { TenantModule } from './tenant/tenant.module';
import { CentralDbModule } from './_db/central_db/central_db.module';
import { OrganizationModule } from './api/organization/organization.module';
import configuration from './_config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validate: validateEnv,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      expandVariables: true,
    }),
    AppConfigModule,
    OrganizationRepositoryModule,
    TenantModule,
    TenantDbModule,
    CentralDbModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
