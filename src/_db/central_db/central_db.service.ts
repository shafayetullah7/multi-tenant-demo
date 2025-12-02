import { Inject, Injectable } from '@nestjs/common';
import type { CentralDbClient, CentralDbTx } from './types/drizzle.client';
import { CENTRAL_DB } from './constants/drizzle.token';

@Injectable()
export class CentralDB {
  constructor(
    @Inject(CENTRAL_DB)
    private readonly db: CentralDbClient,
  ) {}

  get client() {
    return this.db;
  }

  async transaction<T>(callback: (tx: CentralDbTx) => Promise<T>): Promise<T> {
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

  getExecutor(tx?: CentralDbTx) {
    return tx ?? this.db;
  }
}
