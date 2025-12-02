import { Module } from '@nestjs/common';
import { OrganizationRepositoryService } from './organization-repository.service';

@Module({
  controllers: [],
  providers: [OrganizationRepositoryService],
  exports: [OrganizationRepositoryService],
})
export class OrganizationRepositoryModule {}
