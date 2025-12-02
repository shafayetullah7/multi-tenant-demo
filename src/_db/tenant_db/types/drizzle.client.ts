import {
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import * as schema from '../../central_db/tables';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { TTenantSchema } from './drizzle.schema';

export type TenantDbClient = NodePgDatabase<typeof schema>;
export type TenantDbTx = PgTransaction<
  NodePgQueryResultHKT,
  TTenantSchema,
  ExtractTablesWithRelations<typeof schema>
>;