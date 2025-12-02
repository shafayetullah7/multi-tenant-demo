import { ConflictException, Injectable } from '@nestjs/common';
import { CentralDB } from 'src/_db/central_db/central_db.service';
import { TNewOrganization, TOrganization } from 'src/_db/central_db/tables';
import { TenantDB } from 'src/_db/tenant_db/tenant.db.service';
import { OrganizationRepositoryService } from 'src/repositories/organization-repository/organization-repository.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepo: OrganizationRepositoryService,
    private readonly centralDb: CentralDB,
    private readonly tenantDb: TenantDB,
  ) {}

  async createOrganization(payload: TNewOrganization): Promise<TOrganization> {
    const { name } = payload;

    const result = await this.centralDb.transaction(async (centralTx) => {
      return this.tenantDb.transaction(async (tenantTx) => {
        const existingOrganization =
          await this.organizationRepo.getOrganizationByName(name);
        if (existingOrganization) {
          throw new ConflictException(
            'Organization with this name already exists',
          );
        }

        const newOrganization = await this.organizationRepo.createOrganization(
          payload,
          centralTx,
          tenantTx,
        );

        return newOrganization;
      });
    });

    return result;
  }
}
