DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
CREATE EXTENSION "uuid-ossp";

CREATE TYPE public.enum_users_status AS ENUM (
    'active',
    'inactive'
);

CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(255),
  email character varying(255),
  bio text,
  role_id uuid,
  status enum_users_status,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

CREATE TABLE public.user_histories (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  user_id uuid,
  history character varying(100),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  key character varying(100),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

CREATE TABLE public.permissions (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  role_id uuid,
  permission_id uuid,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);


CREATE TYPE public.enum_category_status AS ENUM (
    'active',
    'inactive'
);

CREATE TYPE public.enum_category_type AS ENUM (
    'news',
    'raovat'
);

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  parent_id uuid,
  slug character varying(255),
  is_deleted boolean DEFAULT FALSE, 
  type enum_category_type,
  status enum_category_status,
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TYPE public.enum_news_status AS ENUM (
    'draft',
    'publish'
);

CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  title character varying(255),
  description character varying(255),
  content text,
  publish_date timestamp,
  user_id uuid,
  category_id uuid,
  imageUrl character varying(255),
  status enum_news_status,
  slug character varying(255),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.news_tags (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  news_id uuid,
  tag_id uuid,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  content text,
  news_id uuid,
  user_id uuid,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(50),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.qas (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  question character varying(255),
  answer text,
  publish_date timestamp,
  user_id uuid,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

CREATE TYPE public.enum_document_type AS ENUM (
    'pdf'
);

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  url character varying(100),
  type enum_document_type,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TYPE enum_media_type AS ENUM (
    'image',
    'video',
    'audio'
);

CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  url character varying(100),
  type enum_media_type,
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.ads (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  name character varying(100),
  url character varying(100),
  priotity integer,
  imageUrl character varying(100),
  status character varying(10),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.configs (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  key character varying(100),
  value character varying(100),
  type character varying(10),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);
CREATE TABLE public.rao_vats (
  id uuid PRIMARY KEY DEFAULT public.uuid_generate_v4() NOT NULL,
  title character varying(100),
  content text,
  imageUrl character varying(100),
  category_id uuid,
  publish_date timestamp,
  slug character varying(255),
  is_deleted boolean DEFAULT FALSE, 
  created_by uuid,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now() 
);

ALTER TABLE public.news ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE public.comments ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");

ALTER TABLE public.comments ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE public.news ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE public.news_tags ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");

ALTER TABLE public.news_tags ADD FOREIGN KEY ("news_id") REFERENCES "news" ("id");

ALTER TABLE public.users ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE public.qas ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE public.role_permissions ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE public.role_permissions ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE public.user_histories ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE public.rao_vats ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
