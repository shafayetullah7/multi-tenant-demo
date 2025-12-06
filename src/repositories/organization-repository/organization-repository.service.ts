import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/_db/drizzle/drizzle.service';
import {
  organizationTable,
  TNewOrganization,
  TOrganization,
} from 'src/_db/drizzle/tables';
import { DrizzleTx } from 'src/_db/drizzle/types/drizzle.client';
import { TLockTransaction } from 'src/_db/drizzle/types/lock.transaction';

@Injectable()
export class OrganizationRepositoryService {
  constructor(private readonly db: DrizzleService) {}

  async createOrganization(
    payload: TNewOrganization,
    centralTx: DrizzleTx,
  ): Promise<TOrganization> {
    const [newOrganization] = await centralTx
      .insert(organizationTable)
      .values(payload)
      .returning();

    return newOrganization;
  }

  async getOrganizationByName(
    name: string,
    transaction?: TLockTransaction,
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
