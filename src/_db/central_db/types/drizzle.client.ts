import {
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import * as schema from '../../tenant_db/tables';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { TCentralSchema } from './drizzle.schema';

export type CentralDbClient = NodePgDatabase<typeof schema>;
export type CentralDbTx = PgTransaction<
  NodePgQueryResultHKT,
  TCentralSchema,
  ExtractTablesWithRelations<typeof schema>
>;