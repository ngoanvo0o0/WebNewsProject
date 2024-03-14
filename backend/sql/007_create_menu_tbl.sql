  CREATE TABLE public.menu (
    id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
    "order" integer,
    name character varying(100),
    category_id uuid,
    slug character varying(255),
    is_deleted boolean DEFAULT FALSE, 
    created_by uuid,
    updated_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now() 
  );
  ALTER TYPE public.enum_category_type ADD VALUE 'menu';
  ALTER TABLE public.menu ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
