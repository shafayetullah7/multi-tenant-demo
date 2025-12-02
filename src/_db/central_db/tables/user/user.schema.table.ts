import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { pgSchema } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

const userColumns = {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

const userTableName = 'users';

export const userTableInfo = {
  key: 'userTable',
  table: pgTable(userTableName, userColumns),
  // Function to define the table within a tenant-specific schema
  schemaTable: (tenantId: string) => {
    const schema = `tenant_${tenantId}`;
    return pgSchema(schema).table(userTableName, userColumns);
  },
};

// TypeScript types for selecting and inserting user data
export type TUser = InferSelectModel<typeof userTableInfo.table>;
export type TNewUser = InferInsertModel<typeof userTableInfo.table>;
