CREATE TABLE public.website (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  logo character varying(255),
  footer_content text,
  facebook_url character varying(255),
  twitter_url character varying(255),
  google_url character varying(255),
  linkedin_url character varying(255),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

ALTER TYPE public.enum_advertisement_position ADD VALUE 'center';
ALTER TYPE public.enum_advertisement_position ADD VALUE 'bottom';
