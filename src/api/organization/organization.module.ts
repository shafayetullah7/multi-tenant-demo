import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepositoryModule } from 'src/repositories/organization-repository/organization-repository.module';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [OrganizationRepositoryModule],
})
export class OrganizationModule {}
