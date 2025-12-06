ALTER TABLE "organizations" RENAME COLUMN "tenant_id" TO "slug";--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "display_name" varchar(255);
UPDATE "organizations" SET "display_name" = "name" WHERE "display_name" IS NULL;
ALTER TABLE "organizations" ALTER COLUMN "display_name" SET NOT NULL;