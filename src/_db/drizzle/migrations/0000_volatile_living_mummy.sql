CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tenant_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
