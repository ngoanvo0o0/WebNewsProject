ALTER TABLE IF EXISTS public.categories
  ADD FOREIGN KEY ("parent_id") REFERENCES public.categories ("id");
