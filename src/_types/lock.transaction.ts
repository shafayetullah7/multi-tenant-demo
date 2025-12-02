import { DrizzleTx } from 'src/_db/tenant_db/types/drizzle.client';

export type TLockTransaction = {
  tx: DrizzleTx;
  lock: boolean;
};
