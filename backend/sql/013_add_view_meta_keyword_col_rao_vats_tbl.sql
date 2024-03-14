ALTER TABLE public.news
  ALTER COLUMN "description" TYPE text;

ALTER TABLE public.rao_vats
  ADD COLUMN "meta_keyword" character varying(255),
  ADD COLUMN "view" character varying(255);
