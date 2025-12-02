import { Inject, Injectable } from '@nestjs/common';
import { TENANT_DB } from './constants/drizzle.token';
import type { DrizzleClient, DrizzleTx } from './types/drizzle.client';


@Injectable()
export class TenantDB {
  constructor(
    @Inject(TENANT_DB)
    private readonly db: DrizzleClient,
  ) {}

  get client() {
    return this.db;
  }

  async transaction<T>(callback: (tx: DrizzleTx) => Promise<T>): Promise<T> {
    return await this.db.transaction(async (tx) => {
      try {
        const result = await callback(tx);
        return result;
      } catch (error) {
        console.error('Transaction failed:', error);
        throw error; // rollback is automatic on throw
      }
    });
  }

  getExecutor(tx?: DrizzleTx) {
    return tx ?? this.db;
  }
}