-- 1. Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'member', 'staff');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. Create helper function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS SETOF app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id
$$;

-- 6. RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Update profiles table - remove role column (it's a security risk)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- 8. Update existing RLS policies to use the new role system
-- Members table policies
DROP POLICY IF EXISTS "Users can view their own member record" ON public.members;
DROP POLICY IF EXISTS "Users can create their own member record" ON public.members;
DROP POLICY IF EXISTS "Users can update their own member record" ON public.members;

CREATE POLICY "Users can view their own member record"
ON public.members FOR SELECT
USING (profile_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Users can create their own member record"
ON public.members FOR INSERT
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update their own member record"
ON public.members FOR UPDATE
USING (profile_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete members"
ON public.members FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Accounts table policies
DROP POLICY IF EXISTS "Users can view their own accounts" ON public.accounts;
DROP POLICY IF EXISTS "Users can create their own accounts" ON public.accounts;
DROP POLICY IF EXISTS "Users can update their own accounts" ON public.accounts;

CREATE POLICY "Users can view their own accounts"
ON public.accounts FOR SELECT
USING (
  member_id IN (SELECT id FROM members WHERE profile_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'staff')
);

CREATE POLICY "Users can create accounts"
ON public.accounts FOR INSERT
WITH CHECK (
  member_id IN (SELECT id FROM members WHERE profile_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'staff')
);

CREATE POLICY "Staff can update accounts"
ON public.accounts FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete accounts"
ON public.accounts FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Transactions table policies
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;

CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (
  member_id IN (SELECT id FROM members WHERE profile_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'staff')
);

CREATE POLICY "Staff can create transactions"
ON public.transactions FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update transactions"
ON public.transactions FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Loans table policies
DROP POLICY IF EXISTS "Users can view their own loans" ON public.loans;
DROP POLICY IF EXISTS "Users can create their own loans" ON public.loans;
DROP POLICY IF EXISTS "Users can update their own loans" ON public.loans;

CREATE POLICY "Users can view their own loans"
ON public.loans FOR SELECT
USING (
  member_id IN (SELECT id FROM members WHERE profile_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'staff')
);

CREATE POLICY "Users can create loan applications"
ON public.loans FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM members WHERE profile_id = auth.uid()));

CREATE POLICY "Staff can update loans"
ON public.loans FOR UPDATE
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can delete loans"
ON public.loans FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 9. Trigger to assign 'member' role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();