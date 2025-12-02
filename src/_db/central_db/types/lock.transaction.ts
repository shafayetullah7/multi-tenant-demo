import { CentralDbTx } from './drizzle.client';

export type TCentralLockTransaction = {
  tx: CentralDbTx;
  lock: boolean;
};
