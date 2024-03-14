ALTER TABLE IF EXISTS "users"
    ADD COLUMN "password" character varying(255);

ALTER TABLE IF EXISTS "users"
    ADD COLUMN "google_id" character varying(30);

ALTER TABLE IF EXISTS "users"
    ADD COLUMN "facebook_id" character varying(30);
