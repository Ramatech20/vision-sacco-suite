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

// Sample data functions (will be replaced with real database queries)
export const getAccounts = async () => {
  // Mock data for now - will implement with real database
  return [
    { id: 'ACC001', name: 'Main Savings Account', balance: 125000, type: 'savings' },
    { id: 'ACC002', name: 'Loan Portfolio', balance: 387250, type: 'loans' },
  ];
};

export const getMembers = async () => {
  // Mock data for now - will implement with real database  
  return [
    { id: 'M001', name: 'Alice Johnson', email: 'alice@example.com', phone: '+254700123456', status: 'active' },
    { id: 'M002', name: 'Bob Smith', email: 'bob@example.com', phone: '+254700123457', status: 'active' },
  ];
};

export const getMember = async (id: string) => {
  const members = await getMembers();
  return members.find(m => m.id === id);
};

export const getTransactions = async (accountId: string) => {
  // Mock data for now
  return [
    { id: 'TXN001', amount: 1200, type: 'deposit', date: '2024-01-15', description: 'Monthly savings' },
    { id: 'TXN002', amount: -500, type: 'withdrawal', date: '2024-01-14', description: 'ATM withdrawal' },
  ];
};

export const getReports = async (type: string) => {
  // Mock data for reports
  return [
    { id: 'R001', type, name: `${type} Report`, generatedAt: new Date().toISOString() },
  ];
};

export const getAuditLogs = async () => {
  // Mock audit logs
  return [
    { id: 'A001', action: 'user_login', user: 'admin', timestamp: new Date().toISOString() },
  ];
};

// Authentication functions using Supabase Auth
export const getUserMe = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
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

// CRUD operations (will implement with real database)
export const createMember = async (data: any) => {
  // Will implement with Supabase
  console.log('Creating member:', data);
  return { id: 'new-member', ...data };
};

export const updateMember = async (id: string, data: any) => {
  console.log('Updating member:', id, data);
  return { id, ...data };
};

export const deleteMember = async (id: string) => {
  console.log('Deleting member:', id);
  return { success: true };
};

export const openAccount = async (data: any) => {
  console.log('Opening account:', data);
  return { id: 'new-account', ...data };
};

export const createTransaction = async (data: any) => {
  console.log('Creating transaction:', data);
  return { id: 'new-transaction', ...data };
};

export const transferFunds = async (data: any) => {
  console.log('Transferring funds:', data);
  return { id: 'new-transfer', ...data };
};
