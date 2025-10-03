-- Fix search_path for account and member number generation functions
CREATE OR REPLACE FUNCTION public.generate_member_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_number TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(member_number FROM 2) AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.members;
  
  new_number := 'M' || LPAD(next_num::TEXT, 6, '0');
  RETURN new_number;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_account_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_number TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(account_number FROM 4) AS INTEGER)), 0) + 1
  INTO next_num
  FROM public.accounts;
  
  new_number := 'ACC' || LPAD(next_num::TEXT, 8, '0');
  RETURN new_number;
END;
$$;