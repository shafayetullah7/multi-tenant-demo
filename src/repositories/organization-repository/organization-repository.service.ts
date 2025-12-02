import { Injectable } from '@nestjs/common';
import { CentralDB } from 'src/_db/central_db/central_db.service';
import {
  organizationTable,
  TNewOrganization,
  TOrganization,
} from 'src/_db/central_db/tables';
import { TCentralLockTransaction } from 'src/_db/central_db/types/lock.transaction';

@Injectable()
export class OrganizationRepositoryService {
  constructor(private readonly db: CentralDB) {}

  async createOrganization(
    payload: TNewOrganization,
    transaction?: TCentralLockTransaction,
  ): Promise<TOrganization> {
    const executor = this.db.getExecutor(transaction?.tx);
    const [newOrganization] = await executor
      .insert(organizationTable)
      .values(payload)
      .returning();

    return newOrganization;
  }
}
