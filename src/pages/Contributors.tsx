import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandCoins, TrendingUp, Target, Users, Plus, Download, Calendar } from "lucide-react";

export default function Contributors() {
  const contributionMetrics = [
    {
      title: "Monthly Contributions",
      value: "KSh 445,000",
      change: "+15%",
      changeType: "positive" as const,
      icon: HandCoins,
      description: "This month's total"
    },
    {
      title: "Contributing Members",
      value: "189",
      change: "+8%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active contributors"
    },
    {
      title: "Contribution Rate",
      value: "87.5%",
      change: "+3%",
      changeType: "positive" as const,
      icon: Target,
      description: "On-time contributions"
    },
    {
      title: "Average Contribution",
      value: "KSh 2,354",
      change: "+7%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Per member"
    }
  ];

  const contributionTrendData = [
    { month: "Jan", contributions: 380000, contributors: 165, target: 400000 },
    { month: "Feb", contributions: 395000, contributors: 172, target: 400000 },
    { month: "Mar", contributions: 410000, contributors: 178, target: 400000 },
    { month: "Apr", contributions: 425000, contributors: 182, target: 400000 },
    { month: "May", contributions: 435000, contributors: 186, target: 400000 },
    { month: "Jun", contributions: 445000, contributors: 189, target: 400000 }
  ];

  const contributionColumns = [
    { key: "memberNo", label: "Member", type: "text" as const },
    { key: "name", label: "Name", type: "text" as const },
    { key: "monthlyTarget", label: "Monthly Target", type: "currency" as const },
    { key: "currentMonth", label: "Current Month", type: "currency" as const },
    { key: "lastPayment", label: "Last Payment", type: "date" as const },
    { key: "status", label: "Status", type: "status" as const }
  ];

  const contributionsData = [
    { memberNo: "M001", name: "Mary Wanjiku", monthlyTarget: 3000, currentMonth: 3000, lastPayment: "2024-01-15", status: "Paid" },
    { memberNo: "M002", name: "John Kimani", monthlyTarget: 2500, currentMonth: 2500, lastPayment: "2024-01-12", status: "Paid" },
    { memberNo: "M003", name: "Grace Achieng", monthlyTarget: 4000, currentMonth: 2000, lastPayment: "2024-01-05", status: "Partial" },
    { memberNo: "M004", name: "Peter Mwangi", monthlyTarget: 2000, currentMonth: 0, lastPayment: "2023-12-20", status: "Pending" },
    { memberNo: "M005", name: "Sarah Nyong'o", monthlyTarget: 3500, currentMonth: 3500, lastPayment: "2024-01-14", status: "Paid" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contributions Management</h1>
            <p className="text-muted-foreground mt-1">
              Track member contributions and payment schedules
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Payment Schedule
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contributionMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FinancialChart
            title="Monthly Contribution Trends"
            description="Contributions vs targets over time"
            data={contributionTrendData}
            type="line"
            dataKey="contributions"
            secondaryDataKey="target"
            color="hsl(var(--success))"
            height={300}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Contribution Analysis</CardTitle>
              <CardDescription>Payment patterns and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">On-time Payments</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20">165</Badge>
                  <span className="text-sm text-muted-foreground">87.5%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Partial Payments</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-warning/10 text-warning border-warning/20">15</Badge>
                  <span className="text-sm text-muted-foreground">8%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Payments</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">9</Badge>
                  <span className="text-sm text-muted-foreground">4.5%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Collection Efficiency</span>
                <span className="text-sm font-medium">96.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="Member Contributions Status"
          description="Current month's contribution tracking"
          columns={contributionColumns}
          data={contributionsData}
          actions
        />
      </div>
    </DashboardLayout>
  );
}