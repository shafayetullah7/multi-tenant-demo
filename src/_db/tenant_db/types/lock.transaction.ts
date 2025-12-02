import { TenantDbTx } from './drizzle.client';

export type TenantLockTransaction = {
  tx: TenantDbTx;
  lock: boolean;
};
