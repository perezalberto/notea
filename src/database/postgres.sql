CREATE TABLE IF NOT EXISTS "user" (
	"user_id" uuid NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"image" varchar(255) NOT NULL,
	"active" boolean NOT NULL DEFAULT TRUE,
	"created_at" timestamptz NOT NULL,
	"updated_at" timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS "auth_provider" (
	"user_id" uuid NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"provider_name" varchar(255) NOT NULL,
	PRIMARY KEY ("user_id", "provider_name"),
	UNIQUE ("provider_id", "provider_name"),
	FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "user_subscription" (
	"user_id" uuid NOT NULL,
	"subscription_id" uuid NOT NULL,
	"service_name" varchar(255) NOT NULL,
	PRIMARY KEY ("user_id"),
	UNIQUE ("subscription_id", "service_name"),
	FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "note" (
	"note_id" uuid NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"template" varchar(255) NOT NULL,
	"encrypted" boolean NOT NULL,
	"content" text NOT NULL,
	"favorite" boolean NOT NULL,
	"is_public" boolean NOT NULL,
	"active" boolean NOT NULL DEFAULT TRUE,
	"created_at" timestamptz NOT NULL,
	"updated_at" timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS "group" (
	"group_id" uuid NOT NULL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"icon" varchar(255) NOT NULL,
	"active" boolean NOT NULL DEFAULT TRUE,
	"created_at" timestamptz NOT NULL,
	"updated_at" timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_group" (
	"user_id" uuid NOT NULL,
	"group_id" uuid NOT NULL PRIMARY KEY,
	FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ("group_id") REFERENCES "group" ("group_id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "group_note" (
	"note_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	"owner" boolean NOT NULL,
	UNIQUE ("note_id", "owner"),
	PRIMARY KEY ("note_id", "group_id"),
	FOREIGN KEY ("note_id") REFERENCES "note" ("note_id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ("group_id") REFERENCES "group" ("group_id") ON UPDATE CASCADE ON DELETE CASCADE
);


/*---------------------- CONSULTAS ----------------------------------------------------------------------------- */

/*Usuario segun google_id*/
SELECT "u".* FROM "user" "u", "user_google" "ug" WHERE "u"."user_id" = "ug"."user_id" AND "ug"."google_id" = $1;

/*Grupos de un usuario segun user_id*/
SELECT "g".* FROM "user_group" "ug", "group" "g" WHERE "ug"."group_id" = "g"."group_id" AND "ug"."user_id" = $1;

/*Notas de un grupo segun group_id*/
SELECT "n".* FROM "group_note" "gn", "note" "n" WHERE "gn"."note_id" = "n"."note_id" AND "gn"."group_id" = $1;

/*Notas faboritas de usuario segun user_id*/
SELECT "n".* FROM 
	"user" "u", 
	"user_group" "ug", 
	"group" "g", 
	"group_note" "gn", 
	"note" "n" 
WHERE 
	"u"."user_id" = "ug"."user_id" AND 
	"ug"."group_id" = "gn"."group_id" AND 
	"gn"."note_id" = "n"."note_id" AND 
	"u"."user_id" = $1 AND 
	"n"."favorite" = TRUE;

/*Notas publicas de usuario segun user_id*/
SELECT "n".* FROM 
	"user" "u", 
	"user_group" "ug", 
	"group" "g", 
	"group_note" "gn", 
	"note" "n" 
WHERE 
	"u"."user_id" = "ug"."user_id" AND 
	"ug"."group_id" = "gn"."group_id" AND 
	"gn"."note_id" = "n"."note_id" AND 
	"u"."user_id" = $1 AND 
	"n"."is_public" = TRUE;

/*Notas de usuario segun user_id*/
SELECT "n".* FROM 
	"user" "u", 
	"user_group" "ug", 
	"group" "g", 
	"group_note" "gn", 
	"note" "n" 
WHERE 
	"u"."user_id" = "ug"."user_id" AND 
	"ug"."group_id" = "gn"."group_id" AND 
	"gn"."note_id" = "n"."note_id" AND 
	"u"."user_id" = $1

/*Notas de usuario segun user_id y group_id*/
SELECT "n".* FROM 
	"user" "u", 
	"user_group" "ug",
	"group_note" "gn", 
	"note" "n" 
WHERE 
	"u"."user_id" = "ug"."user_id" AND 
	"ug"."group_id" = "gn"."group_id" AND 
	"gn"."note_id" = "n"."note_id" AND 
	"u"."user_id" = $1 AND 
	"gn"."group_id" = $2

/*Update note*/
UPDATE "note" SET "name" = $1, "description" = $2, "template" = $3, "encrypted" = $4, "content" = $5, "favorite" = $6, "is_public" = $7 WHERE "note_id" = $8

/*Update user*/
UPDATE "user" SET "name" = $1, "email" = $2, "image" = $3 WHERE "user_id" = $4

/*Update group*/
UPDATE "group" SET "name" = $1, "description" = $2, "icon" = $3 WHERE "group_id" = $4

/*Update user_group*/
UPDATE "user_group" SET "owner" = $1 WHERE "user_id" = $2 AND "group_id" = $3

/*Update group_note*/
UPDATE "group_note" SET "owner" = $1 WHERE "group_id" = $2 AND "note_id" = $3

/*Update user_subscription*/
UPDATE "user_subscription" SET "service_name" = $1 WHERE "user_id" = $2 AND "subscription_id" = $3

/*Update user_google*/
UPDATE "user_google" SET "google_id" = $1 WHERE "user_id" = $2

/*Delete note*/
DELETE FROM "note" WHERE "note_id" = $1

/*Delete group*/
DELETE FROM "group" WHERE "group_id" = $1

/*Delete user*/
DELETE FROM "user" WHERE "user_id" = $1

/*Delete user_group*/
DELETE FROM "user_group" WHERE "user_id" = $1 AND "group_id" = $2

/*Delete group_note*/
DELETE FROM "group_note" WHERE "group_id" = $1 AND "note_id" = $2

/*Delete user_subscription*/
DELETE FROM "user_subscription" WHERE "user_id" = $1 AND "subscription_id" = $2

/*Delete user_google*/
DELETE FROM "user_google" WHERE "user_id" = $1

/*Insert user*/
INSERT INTO "user" ("user_id", "name", "email", "image", "active", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7)

/*Insert user_google*/
INSERT INTO "user_google" ("user_id", "google_id") VALUES ($1, $2)

/*Insert user_subscription*/
INSERT INTO "user_subscription" ("user_id", "subscription_id", "service_name") VALUES ($1, $2, $3)

/*Insert user_group*/
INSERT INTO "user_group" ("user_id", "group_id") VALUES ($1, $2)

/*Insert group*/
INSERT INTO "group" ("group_id", "name", "description", "icon", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6)

/*Insert group_note*/
INSERT INTO "group_note" ("group_id", "note_id", "owner") VALUES ($1, $2, $3)

/*Insert note*/
INSERT INTO "note" ("note_id", "name", "description", "template", "encrypted", "content", "favorite", "is_public", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

