import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, PiggyBank, Users, Plus, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { getAccounts, getTransactions } from "@/lib/api";

export default function Savings() {
  const savingsMetrics = [
    {
      title: "Total Savings",
      value: "KSh 3,850,000",
      change: "+18%",
      changeType: "positive" as const,
      icon: Wallet,
      description: "All member savings"
    },
    {
      title: "Monthly Deposits",
      value: "KSh 295,000",
      change: "+15%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "This month's deposits"
    },
    {
      title: "Active Savers",
      value: "187",
      change: "+5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Members with savings"
    },
    {
      title: "Average Balance",
      value: "KSh 20,588",
      change: "+12%",
      changeType: "positive" as const,
      icon: PiggyBank,
      description: "Per member average"
    }
  ];

  const savingsTrendData = [
    { month: "Jan", deposits: 240000, withdrawals: 180000, balance: 3200000 },
    { month: "Feb", deposits: 265000, withdrawals: 190000, balance: 3275000 },
    { month: "Mar", deposits: 280000, withdrawals: 200000, balance: 3355000 },
    { month: "Apr", deposits: 295000, withdrawals: 185000, balance: 3465000 },
    { month: "May", deposits: 310000, withdrawals: 195000, balance: 3580000 },
    { month: "Jun", deposits: 295000, withdrawals: 175000, balance: 3700000 }
  ];

  const savingsColumns = [
    { key: "accountNo", label: "Account", type: "text" as const },
    { key: "member", label: "Member Name", type: "text" as const },
    { key: "type", label: "Account Type", type: "text" as const },
    { key: "balance", label: "Current Balance", type: "currency" as const },
    { key: "openedDate", label: "Opened Date", type: "date" as const },
    { key: "status", label: "Status", type: "status" as const }
  ];

  const [savingsData, setSavingsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAccounts()
      .then((data) => setSavingsData(data))
      .catch((err) => setError("Failed to fetch savings accounts"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedAccount) return;
    setTxLoading(true);
    getTransactions(selectedAccount)
      .then((data) => setTransactions(data))
      .catch(() => setTxError("Failed to fetch transactions"))
      .finally(() => setTxLoading(false));
  }, [selectedAccount]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Savings Management</h1>
            <p className="text-muted-foreground mt-1">
              Track member savings and deposit activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Deposit
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {savingsMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FinancialChart
            title="Savings Growth Trend"
            description="Monthly deposits vs withdrawals"
            data={savingsTrendData}
            type="area"
            dataKey="deposits"
            secondaryDataKey="withdrawals"
            color="hsl(var(--success))"
            height={300}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Savings Distribution</CardTitle>
              <CardDescription>Member savings breakdown by range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">KSh 0 - 20,000</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-muted text-muted-foreground">45</Badge>
                  <span className="text-sm text-muted-foreground">24%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">KSh 20,001 - 50,000</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">89</Badge>
                  <span className="text-sm text-muted-foreground">48%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">KSh 50,001 - 100,000</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20">42</Badge>
                  <span className="text-sm text-muted-foreground">22%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Above KSh 100,000</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent/10 text-accent border-accent/20">11</Badge>
                  <span className="text-sm text-muted-foreground">6%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && <div className="text-red-500 mb-2">{error}</div>}
        <DataTable
          title="Member Savings Accounts"
          description="Current savings accounts and balances"
          columns={savingsColumns}
          data={savingsData}
          actions
          onRowClick={(row) => setSelectedAccount(row.accountNo || row.id)}
        />

        {selectedAccount && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transactions for Account {selectedAccount}</CardTitle>
              <CardDescription>Recent transactions for this savings account</CardDescription>
            </CardHeader>
            <CardContent>
              {txError && <div className="text-red-500 mb-2">{txError}</div>}
              <DataTable
                title="Transactions"
                description="All transactions for this account"
                columns={[
                  { key: "id", label: "Transaction ID", type: "text" },
                  { key: "type", label: "Type", type: "text" },
                  { key: "amount", label: "Amount", type: "currency" },
                  { key: "description", label: "Description", type: "text" },
                  { key: "createdAt", label: "Date", type: "date" },
                ]}
                data={transactions}
                actions={false}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}