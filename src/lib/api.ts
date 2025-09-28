const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Sample endpoint wrappers
export const getHealth = () => apiFetch("/health");
export const getAccounts = () => apiFetch("/accounts");
export const getMembers = () => apiFetch("/members");
export const getMember = (id: string) => apiFetch(`/members/${id}`);
export const getTransactions = (accountId: string) => apiFetch(`/transactions/${accountId}`);
export const getReports = (type: string) => apiFetch(`/reports/${type}`);
export const getAuditLogs = () => apiFetch("/audit");
export const getUserMe = () => apiFetch("/users/me");

export const login = (data: any) => apiFetch("/auth/login", { method: "POST", body: JSON.stringify(data) });
export const register = (data: any) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const createMember = (data: any) => apiFetch("/members", { method: "POST", body: JSON.stringify(data) });
export const updateMember = (id: string, data: any) => apiFetch(`/members/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMember = (id: string) => apiFetch(`/members/${id}`, { method: "DELETE" });
export const openAccount = (data: any) => apiFetch("/accounts", { method: "POST", body: JSON.stringify(data) });
export const createTransaction = (data: any) => apiFetch("/transactions", { method: "POST", body: JSON.stringify(data) });
export const transferFunds = (data: any) => apiFetch("/transfer", { method: "POST", body: JSON.stringify(data) });
