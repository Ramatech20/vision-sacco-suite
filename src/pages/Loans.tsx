import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, AlertTriangle, Users, Plus, Download } from "lucide-react";

export default function Loans() {
  const loanMetrics = [
    {
      title: "Total Active Loans",
      value: "KSh 2,450,000",
      change: "+12%",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "124 active loans"
    },
    {
      title: "Monthly Collections",
      value: "KSh 185,000",
      change: "+8%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "This month's repayments"
    },
    {
      title: "Overdue Loans",
      value: "KSh 125,000",
      change: "-5%",
      changeType: "negative" as const,
      icon: AlertTriangle,
      description: "15 loans overdue"
    },
    {
      title: "Default Rate",
      value: "3.2%",
      change: "+0.5%",
      changeType: "negative" as const,
      icon: Users,
      description: "Industry avg: 5.1%"
    }
  ];

  const loanTrendData = [
    { month: "Jan", disbursed: 180000, collected: 165000, outstanding: 2100000 },
    { month: "Feb", disbursed: 220000, collected: 175000, outstanding: 2145000 },
    { month: "Mar", disbursed: 195000, collected: 180000, outstanding: 2160000 },
    { month: "Apr", disbursed: 250000, collected: 185000, outstanding: 2225000 },
    { month: "May", disbursed: 210000, collected: 190000, outstanding: 2245000 },
    { month: "Jun", disbursed: 275000, collected: 185000, outstanding: 2335000 }
  ];

  const loanColumns = [
    { key: "loanId", label: "Loan ID", type: "text" as const },
    { key: "borrower", label: "Borrower", type: "text" as const },
    { key: "amount", label: "Amount", type: "currency" as const },
    { key: "balance", label: "Balance", type: "currency" as const },
    { key: "dueDate", label: "Due Date", type: "date" as const },
    { key: "status", label: "Status", type: "status" as const }
  ];

  const loansData = [
    { loanId: "LN001", borrower: "Mary Wanjiku", amount: 50000, balance: 35000, dueDate: "2024-01-15", status: "Current" },
    { loanId: "LN002", borrower: "John Kimani", amount: 75000, balance: 60000, dueDate: "2024-01-20", status: "Current" },
    { loanId: "LN003", borrower: "Grace Achieng", amount: 30000, balance: 15000, dueDate: "2023-12-30", status: "Overdue" },
    { loanId: "LN004", borrower: "Peter Mwangi", amount: 100000, balance: 85000, dueDate: "2024-02-05", status: "Current" },
    { loanId: "LN005", borrower: "Sarah Nyong'o", amount: 25000, balance: 0, dueDate: "2024-01-10", status: "Paid" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Loan Management</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage all loan activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Loan
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loanMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FinancialChart
            title="Loan Performance Trends"
            description="Monthly disbursements vs collections"
            data={loanTrendData}
            type="line"
            dataKey="disbursed"
            secondaryDataKey="collected"
            color="hsl(var(--primary))"
            height={300}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Loan Portfolio Summary</CardTitle>
              <CardDescription>Current portfolio breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Loans</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20">109</Badge>
                  <span className="text-sm text-muted-foreground">88%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue Loans</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">15</Badge>
                  <span className="text-sm text-muted-foreground">12%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Loan Size</span>
                <span className="text-sm font-medium">KSh 19,758</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Interest Rate</span>
                <span className="text-sm font-medium">12% p.a.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="Recent Loan Applications"
          description="Latest loan applications and their status"
          columns={loanColumns}
          data={loansData}
          actions
        />
      </div>
    </DashboardLayout>
  );
}