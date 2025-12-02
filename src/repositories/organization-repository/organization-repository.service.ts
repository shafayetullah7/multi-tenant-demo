import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { CentralDB } from 'src/_db/central_db/central_db.service';
import {
  organizationTable,
  TNewOrganization,
  TOrganization,
} from 'src/_db/central_db/tables';
import { CentralDbTx } from 'src/_db/central_db/types/drizzle.client';
import { TCentralLockTransaction } from 'src/_db/central_db/types/lock.transaction';
import { TenantDbTx } from 'src/_db/tenant_db/types/drizzle.client';

@Injectable()
export class OrganizationRepositoryService {
  constructor(private readonly db: CentralDB) {}

  async createOrganization(
    payload: TNewOrganization,
    centralTx: CentralDbTx,
    tenantTx: TenantDbTx,
  ): Promise<TOrganization> {
    const [newOrganization] = await centralTx
      .insert(organizationTable)
      .values(payload)
      .returning();

    const tenantId = newOrganization.tenantId;

    const schema = `tenant_${tenantId}`;
    await tenantTx.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${schema}";`));

    return newOrganization;
  }

  async getOrganizationByName(
    name: string,
    transaction?: TCentralLockTransaction,
  ): Promise<TOrganization | null> {
    const executor = this.db.getExecutor(transaction?.tx);
    const baseQuery = executor
      .select()
      .from(organizationTable)
      .where(and(eq(organizationTable.name, name)))
      .limit(1);

    const lockQuery = transaction?.lock ? baseQuery.for('update') : baseQuery;

    const [organization] = await lockQuery.execute();

    return organization;
  }
}
