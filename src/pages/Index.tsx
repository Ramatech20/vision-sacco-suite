import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import {
  DollarSign,
  PiggyBank,
  Users,
  TrendingUp,
  CreditCard,
  Target,
} from "lucide-react";

// Sample data for demonstration
const monthlyData = [
  { month: "Jan", loans: 45000, savings: 32000, contributions: 18000 },
  { month: "Feb", loans: 52000, savings: 38000, contributions: 22000 },
  { month: "Mar", loans: 48000, savings: 42000, contributions: 25000 },
  { month: "Apr", loans: 61000, savings: 45000, contributions: 28000 },
  { month: "May", loans: 55000, savings: 48000, contributions: 30000 },
  { month: "Jun", loans: 67000, savings: 52000, contributions: 33000 },
];

const recentTransactions = [
  {
    id: "TXN001",
    member: "Alice Johnson",
    type: "Loan Payment",
    amount: 1200,
    status: "active",
    date: "2024-01-15",
  },
  {
    id: "TXN002",
    member: "Bob Smith",
    type: "Savings Deposit",
    amount: 500,
    status: "active",
    date: "2024-01-14",
  },
  {
    id: "TXN003",
    member: "Carol Wilson",
    type: "Contribution",
    amount: 300,
    status: "pending",
    date: "2024-01-13",
  },
  {
    id: "TXN004",
    member: "David Brown",
    type: "Loan Payment",
    amount: 800,
    status: "overdue",
    date: "2024-01-10",
  },
  {
    id: "TXN005",
    member: "Eva Davis",
    type: "Savings Deposit",
    amount: 750,
    status: "active",
    date: "2024-01-12",
  },
];

const transactionColumns = [
  { key: "id", label: "Transaction ID", type: "text" as const },
  { key: "member", label: "Member", type: "text" as const },
  { key: "type", label: "Type", type: "text" as const },
  { key: "amount", label: "Amount", type: "currency" as const },
  { key: "status", label: "Status", type: "status" as const },
  { key: "date", label: "Date", type: "date" as const },
];

import { useEffect, useState } from "react";
import { getHealth } from "@/lib/api";

const Index = () => {
  const [apiStatus, setApiStatus] = useState<string>("checking...");

  useEffect(() => {
    getHealth()
      .then((data) => setApiStatus(data.status))
      .catch(() => setApiStatus("error"));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your financial overview.
            </p>
            <p className="text-xs mt-2">
              Backend API status: <span className="font-semibold">{apiStatus}</span>
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Loans"
              value="KSh 387,250"
            change="+12.5%"
            changeType="positive"
            icon={DollarSign}
            description="Active loan portfolio"
          />
          <MetricCard
            title="Total Savings"
              value="KSh 156,890"
            change="+8.2%"
            changeType="positive"
            icon={PiggyBank}
            description="Member savings balance"
          />
          <MetricCard
            title="Active Members"
            value="1,247"
            change="+3.1%"
            changeType="positive"
            icon={Users}
            description="Registered members"
          />
          <MetricCard
            title="Monthly Growth"
            value="15.3%"
            change="+2.4%"
            changeType="positive"
            icon={TrendingUp}
            description="Portfolio growth rate"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FinancialChart
            title="Loan Portfolio Trends"
            description="Monthly loan disbursements and performance"
            data={monthlyData}
            type="area"
            dataKey="loans"
            xAxisKey="month"
            color="hsl(var(--chart-primary))"
          />
          <FinancialChart
            title="Savings Growth"
            description="Member savings accumulation over time"
            data={monthlyData}
            type="line"
            dataKey="savings"
            xAxisKey="month"
            color="hsl(var(--chart-secondary))"
          />
        </div>

        {/* Contributions Chart */}
        <FinancialChart
          title="Monthly Contributions"
          description="Member contribution patterns and trends"
          data={monthlyData}
          type="bar"
          dataKey="contributions"
          xAxisKey="month"
          color="hsl(var(--chart-tertiary))"
          height={250}
        />

        {/* Recent Transactions */}
        <DataTable
          title="Recent Transactions"
          description="Latest financial activities across all accounts"
          columns={transactionColumns}
          data={recentTransactions}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
