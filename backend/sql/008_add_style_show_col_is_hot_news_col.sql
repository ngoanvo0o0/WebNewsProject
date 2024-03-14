CREATE TYPE enum_categories_style_show AS ENUM (
  'news1',
  'news2',
  'news3'
);

ALTER TABLE public.categories 
  ADD COLUMN "style_show" enum_categories_style_show;

ALTER TABLE public.news 
  ADD COLUMN "is_hot_news" BOOLEAN;
