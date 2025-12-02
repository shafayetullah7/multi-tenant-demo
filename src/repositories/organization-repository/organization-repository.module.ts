import { Module } from '@nestjs/common';
import { OrganizationRepositoryService } from './organization-repository.service';

@Module({
  controllers: [],
  providers: [OrganizationRepositoryService],
})
export class OrganizationRepositoryModule {}
