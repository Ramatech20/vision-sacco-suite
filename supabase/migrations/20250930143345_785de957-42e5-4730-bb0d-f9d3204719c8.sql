-- Create members table
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  member_number TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  national_id TEXT UNIQUE,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  join_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  account_number TEXT UNIQUE NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('savings', 'shares', 'loan')),
  balance NUMERIC(15,2) DEFAULT 0,
  interest_rate NUMERIC(5,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
  opened_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create loans table
CREATE TABLE IF NOT EXISTS public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  loan_number TEXT UNIQUE NOT NULL,
  principal_amount NUMERIC(15,2) NOT NULL,
  interest_rate NUMERIC(5,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  monthly_payment NUMERIC(15,2) NOT NULL,
  outstanding_balance NUMERIC(15,2) NOT NULL,
  disbursement_date TIMESTAMPTZ,
  maturity_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'disbursed', 'active', 'overdue', 'paid', 'defaulted')),
  purpose TEXT,
  guarantor_1 UUID REFERENCES public.members(id),
  guarantor_2 UUID REFERENCES public.members(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
  transaction_number TEXT UNIQUE NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'loan_disbursement', 'loan_repayment', 'interest', 'fee', 'transfer')),
  amount NUMERIC(15,2) NOT NULL,
  balance_before NUMERIC(15,2),
  balance_after NUMERIC(15,2),
  description TEXT,
  reference_number TEXT,
  processed_by UUID REFERENCES public.profiles(id),
  transaction_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add account_type to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS account_type TEXT CHECK (account_type IN ('individual', 'business', 'sacco'));

-- Enable RLS on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for members
CREATE POLICY "Users can view their own member record"
ON public.members FOR SELECT
USING (profile_id = auth.uid());

CREATE POLICY "Users can create their own member record"
ON public.members FOR INSERT
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update their own member record"
ON public.members FOR UPDATE
USING (profile_id = auth.uid());

-- Create RLS policies for accounts
CREATE POLICY "Users can view their own accounts"
ON public.accounts FOR SELECT
USING (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can create their own accounts"
ON public.accounts FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can update their own accounts"
ON public.accounts FOR UPDATE
USING (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

-- Create RLS policies for loans
CREATE POLICY "Users can view their own loans"
ON public.loans FOR SELECT
USING (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can create their own loans"
ON public.loans FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can update their own loans"
ON public.loans FOR UPDATE
USING (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

CREATE POLICY "Users can create their own transactions"
ON public.transactions FOR INSERT
WITH CHECK (member_id IN (SELECT id FROM public.members WHERE profile_id = auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loans_updated_at
BEFORE UPDATE ON public.loans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate member number
CREATE OR REPLACE FUNCTION generate_member_number()
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;

-- Create function to generate account number
CREATE OR REPLACE FUNCTION generate_account_number()
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql;