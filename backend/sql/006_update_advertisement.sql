ALTER TABLE IF EXISTS public.ads
    RENAME priotity TO "order";

CREATE TYPE enum_advertisement_status AS ENUM (
    'active',
    'inactive'
);

CREATE TYPE enum_advertisement_position AS ENUM (
    'top',
    'left',
    'right'
);

ALTER TABLE ads 
    ADD COLUMN "position" enum_advertisement_position NOT NULL DEFAULT 'top',
    ALTER COLUMN status TYPE enum_advertisement_status USING status::enum_advertisement_status,
    ALTER COLUMN status SET DEFAULT 'active';
