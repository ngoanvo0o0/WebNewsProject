ALTER TABLE
    IF EXISTS public.users
ADD
    COLUMN "refresh_token" character varying(2000);