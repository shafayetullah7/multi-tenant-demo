import { Injectable } from '@nestjs/common';
import {
  organizationTable,
  TNewOrganization,
  TOrganization,
} from 'src/_db/tenant_db/tables';
import { TenantDB } from 'src/_db/tenant_db/tenant.db.service';
import { TLockTransaction } from 'src/_types/lock.transaction';

@Injectable()
export class OrganizationRepositoryService {
  constructor(private readonly db: TenantDB) {}

  async createOrganization(
    payload: TNewOrganization,
    transaction?: TLockTransaction,
  ): Promise<TOrganization> {
    const executor = this.db.getExecutor(transaction?.tx);
    const [newOrganization] = await executor
      .insert(organizationTable)
      .values(payload)
      .returning();

    return newOrganization;
  }
}
