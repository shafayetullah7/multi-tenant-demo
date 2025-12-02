import {
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import * as schema from '../tables';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { TDrizzleSchema } from './drizzle.schema';

export type DrizzleClient = NodePgDatabase<typeof schema>;
export type DrizzleTx = PgTransaction<
  NodePgQueryResultHKT,
  TDrizzleSchema,
  ExtractTablesWithRelations<typeof schema>
>;