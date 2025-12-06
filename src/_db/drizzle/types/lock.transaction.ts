import { DrizzleTx } from './drizzle.client';

export type TLockTransaction = {
  tx: DrizzleTx;
  lock: boolean;
};
