ALTER TABLE public.comments
  ADD COLUMN "anonymous_email" character varying(255),
  ADD COLUMN "anonymous_name" character varying(255),
  ADD COLUMN "anonymous_address" character varying(255),
  ADD COLUMN "rao_vat_id" uuid,
  ADD FOREIGN KEY ("rao_vat_id") REFERENCES "rao_vats" ("id");

ALTER TABLE public.users
  ADD COLUMN "avatar" character varying(255); 