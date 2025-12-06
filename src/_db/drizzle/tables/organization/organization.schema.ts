import { pgTable, uuid, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const organizationTable = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: serial('tenant_id').notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Types
export type TOrganization = InferSelectModel<typeof organizationTable>;
export type TNewOrganization = InferInsertModel<typeof organizationTable>;
