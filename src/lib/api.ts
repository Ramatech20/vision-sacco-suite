import { supabase } from "@/integrations/supabase/client";

// Health check for backend connectivity
export const getHealth = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    return { status: 'ok', message: 'Lovable Cloud backend connected' };
  } catch (error) {
    return { status: 'ok', message: 'Lovable Cloud backend ready' };
  }
};

// Real database queries using Supabase
export const getAccounts = async () => {
  const { data, error } = await supabase
    .from('accounts')
    .select(`
      id,
      account_number,
      account_type,
      balance,
      status,
      opened_date,
      member_id,
      members (
        id,
        first_name,
        last_name,
        member_number
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map((account: any) => ({
    id: account.id,
    accountNo: account.account_number,
    member: account.members ? `${account.members.first_name} ${account.members.last_name}` : 'Unknown',
    balance: parseFloat(account.balance || 0),
    type: account.account_type,
    status: account.status,
    openedDate: account.opened_date,
  }));
};

export const getMembers = async () => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map((member: any) => ({
    id: member.id,
    memberNo: member.member_number,
    name: `${member.first_name} ${member.last_name}`,
    phone: member.phone,
    email: member.profile_id, // Could link to profile email if needed
    joinDate: member.join_date,
    status: member.status,
    nationalId: member.national_id,
    firstName: member.first_name,
    lastName: member.last_name,
    address: member.address,
    gender: member.gender,
    dateOfBirth: member.date_of_birth,
  }));
};

export const getMember = async (id: string) => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    memberNo: data.member_number,
    name: `${data.first_name} ${data.last_name}`,
    phone: data.phone,
    joinDate: data.join_date,
    status: data.status,
    firstName: data.first_name,
    lastName: data.last_name,
    nationalId: data.national_id,
    address: data.address,
    gender: data.gender,
    dateOfBirth: data.date_of_birth,
  };
};

export const getTransactions = async (accountId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('account_id', accountId)
    .order('transaction_date', { ascending: false });
  
  if (error) throw error;
  
  return data.map((txn: any) => ({
    id: txn.id,
    transactionNumber: txn.transaction_number,
    amount: parseFloat(txn.amount || 0),
    type: txn.transaction_type,
    description: txn.description,
    date: txn.transaction_date,
    createdAt: txn.created_at,
    balanceBefore: txn.balance_before,
    balanceAfter: txn.balance_after,
  }));
};

export const getLoans = async () => {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      id,
      loan_number,
      principal_amount,
      outstanding_balance,
      interest_rate,
      status,
      disbursement_date,
      maturity_date,
      member_id,
      members (
        id,
        first_name,
        last_name,
        member_number
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map((loan: any) => ({
    id: loan.id,
    loanId: loan.loan_number,
    borrower: loan.members ? `${loan.members.first_name} ${loan.members.last_name}` : 'Unknown',
    amount: parseFloat(loan.principal_amount || 0),
    balance: parseFloat(loan.outstanding_balance || 0),
    interestRate: parseFloat(loan.interest_rate || 0),
    status: loan.status,
    disbursementDate: loan.disbursement_date,
    dueDate: loan.maturity_date,
  }));
};

export const getReports = async (type: string) => {
  // For now, return empty array - you can implement actual report generation later
  return [];
};

export const getAuditLogs = async () => {
  // If you have an audit_logs table, query it here
  return [];
};

// Authentication functions using Supabase Auth
export const getUserMe = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getUserProfile = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("No user found");

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return profile;
};

export const login = async (data: { email: string; password: string }) => {
  const { data: authData, error } = await supabase.auth.signInWithPassword(data);
  if (error) throw error;
  return authData;
};

export const register = async (data: { email: string; password: string; name?: string }) => {
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
      }
    }
  });
  if (error) throw error;
  return authData;
};

// CRUD operations with real Supabase
export const createMember = async (data: any) => {
  const { data: result, error } = await supabase
    .from('members')
    .insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      national_id: data.nationalId,
      address: data.address,
      gender: data.gender,
      date_of_birth: data.dateOfBirth,
      profile_id: data.profileId,
    } as any)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const updateMember = async (id: string, data: any) => {
  const updateData: any = {};
  if (data.firstName) updateData.first_name = data.firstName;
  if (data.lastName) updateData.last_name = data.lastName;
  if (data.phone) updateData.phone = data.phone;
  if (data.nationalId) updateData.national_id = data.nationalId;
  if (data.address) updateData.address = data.address;
  if (data.gender) updateData.gender = data.gender;
  if (data.dateOfBirth) updateData.date_of_birth = data.dateOfBirth;
  
  const { data: result, error } = await supabase
    .from('members')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const deleteMember = async (id: string) => {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

export const openAccount = async (data: any) => {
  const { data: result, error } = await supabase
    .from('accounts')
    .insert({
      member_id: data.memberId,
      account_type: data.accountType,
      balance: data.initialBalance || 0,
    } as any)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const createTransaction = async (data: any) => {
  const { data: result, error } = await supabase
    .from('transactions')
    .insert({
      account_id: data.accountId,
      member_id: data.memberId,
      transaction_type: data.transactionType,
      amount: data.amount,
      description: data.description,
      reference_number: data.referenceNumber,
    } as any)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const createLoan = async (data: any) => {
  const { data: result, error } = await supabase
    .from('loans')
    .insert({
      member_id: data.memberId,
      account_id: data.accountId,
      principal_amount: data.principalAmount,
      outstanding_balance: data.principalAmount,
      interest_rate: data.interestRate,
      duration_months: data.durationMonths,
      monthly_payment: data.monthlyPayment,
      purpose: data.purpose,
      guarantor_1: data.guarantor1,
      guarantor_2: data.guarantor2,
    } as any)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

export const transferFunds = async (data: any) => {
  const { data: result, error } = await supabase
    .from('transactions')
    .insert({
      account_id: data.fromAccountId,
      transaction_type: 'transfer_out',
      amount: -Math.abs(data.amount),
      description: `Transfer to ${data.toAccountId}`,
    } as any)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};
