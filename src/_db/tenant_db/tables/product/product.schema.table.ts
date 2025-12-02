import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { pgSchema } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

const productColumns = {
  id: uuid('id').primaryKey(),
  productName: varchar('product_name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow() // sets initial value
    .notNull()
    .$onUpdate(() => new Date()),
};

const tableName = 'products';

export const productTable = pgTable(tableName, productColumns);

export const productTableInfo = {
  key: 'productTable',
  table: pgTable(tableName, productColumns),
  schemaTable: (tenantId: string) => {
    const schema = `tenant_${tenantId}`;
    return pgSchema(schema).table(tableName, productColumns);
  },
};

export type TProduct = InferSelectModel<typeof productTableInfo.table>;
export type TNewProduct = InferInsertModel<typeof productTableInfo.table>;
