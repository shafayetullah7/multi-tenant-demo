import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './_config/app-config/app-config.module';
import { OrganizationRepositoryModule } from './repositories/organization-repository/organization-repository.module';
import { TenantModule } from './tenant/tenant.module';
import { CentralDbModule } from './_db/drizzle/drizzle.module';
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
