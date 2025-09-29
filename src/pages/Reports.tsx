import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import {
  FileText,
  Download,
  Filter,
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  DollarSign,
  PieChart,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import { format } from "date-fns";

// Sample report data
const loanReportData = [
  { month: "Jan", disbursed: 45000, repaid: 38000, outstanding: 125000 },
  { month: "Feb", disbursed: 52000, repaid: 42000, outstanding: 135000 },
  { month: "Mar", disbursed: 48000, repaid: 45000, outstanding: 138000 },
  { month: "Apr", disbursed: 61000, repaid: 48000, outstanding: 151000 },
  { month: "May", disbursed: 55000, repaid: 52000, outstanding: 154000 },
  { month: "Jun", disbursed: 67000, repaid: 55000, outstanding: 166000 },
];

import { useEffect } from "react";
import { getReports } from "@/lib/api";

const memberColumns = [
  { key: "id", label: "Member ID", type: "text" as const },
  { key: "name", label: "Name", type: "text" as const },
  { key: "loanBalance", label: "Loan Balance", type: "currency" as const },
  { key: "savingsBalance", label: "Savings", type: "currency" as const },
  { key: "contributions", label: "Contributions", type: "currency" as const },
  { key: "status", label: "Status", type: "status" as const },
  { key: "joinDate", label: "Join Date", type: "date" as const },
];

const Reports = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [memberReports, setMemberReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getReports("member-stats")
      .then((data) => setMemberReports(data))
      .catch(() => setError("Failed to fetch member reports"))
      .finally(() => setLoading(false));
  }, []);

  const reportTypes = [
    {
      title: "Loan Portfolio Report",
      description: "Comprehensive analysis of loan disbursements, repayments, and outstanding balances",
      icon: DollarSign,
      badge: "Financial",
      downloadFormats: ["PDF", "Excel", "CSV"],
    },
    {
      title: "Member Activity Report",
      description: "Detailed member statistics including savings, loans, and contribution patterns",
      icon: Users,
      badge: "Members",
      downloadFormats: ["PDF", "Excel"],
    },
    {
      title: "Financial Performance",
      description: "Key performance indicators and financial health metrics",
      icon: TrendingUp,
      badge: "Analytics",
      downloadFormats: ["PDF", "Excel"],
    },
    {
      title: "Savings Analysis",
      description: "Member savings trends, growth patterns, and account summaries",
      icon: PieChart,
      badge: "Savings",
      downloadFormats: ["PDF", "Excel", "CSV"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-muted-foreground">
              Generate comprehensive reports and analytics for your SACCO
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate as any}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <report.icon className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {report.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {report.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {report.downloadFormats.map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                    >
                      <Download className="w-3 h-3" />
                      {format}
                    </Button>
                  ))}
                </div>
                <Button className="w-full gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Details Tabs */}
        <Tabs defaultValue="loans" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="loans" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="exports" className="gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Exports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <FinancialChart
                title="Loan Disbursement vs Repayment"
                description="Monthly comparison of loan disbursements and repayments"
                data={loanReportData}
                type="bar"
                dataKey="disbursed"
                xAxisKey="month"
                color="hsl(var(--chart-primary))"
              />
              <FinancialChart
                title="Outstanding Loan Portfolio"
                description="Total outstanding loan amounts over time"
                data={loanReportData}
                type="area"
                dataKey="outstanding"
                xAxisKey="month"
                color="hsl(var(--chart-secondary))"
              />
            </div>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Loan Performance Metrics</CardTitle>
                <CardDescription>Key indicators for loan portfolio health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Repayment Rate</p>
                    <p className="text-2xl font-bold text-success">92.5%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Default Rate</p>
                    <p className="text-2xl font-bold text-destructive">3.2%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Portfolio at Risk</p>
                    <p className="text-2xl font-bold text-warning">4.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <DataTable
              title="Member Financial Summary"
              description="Comprehensive view of member accounts and activity"
              columns={memberColumns}
              data={memberReports}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Interest and fee income breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Loan Interest</span>
                      <span className="font-semibold">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Processing Fees</span>
                      <span className="font-semibold">$3,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Late Fees</span>
                      <span className="font-semibold">$850</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Revenue</span>
                        <span className="font-bold text-lg text-success">$16,500</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>Month-over-month growth indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Member Growth</span>
                      <span className="font-semibold text-success">+8.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Savings Growth</span>
                      <span className="font-semibold text-success">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Loan Portfolio</span>
                      <span className="font-semibold text-success">+15.3%</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Asset Growth</span>
                        <span className="font-bold text-lg text-success">+11.8%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report generation and delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Financial Summary</p>
                      <p className="text-sm text-muted-foreground">Every 1st of the month</p>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Loan Report</p>
                      <p className="text-sm text-muted-foreground">Every Monday</p>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <Button className="w-full gap-2">
                    <Filter className="w-4 h-4" />
                    Configure Schedules
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Custom Exports</CardTitle>
                  <CardDescription>Generate custom reports with specific parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loans">Loan Data</SelectItem>
                      <SelectItem value="members">Member Data</SelectItem>
                      <SelectItem value="savings">Savings Data</SelectItem>
                      <SelectItem value="transactions">Transaction Data</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Generate Export
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;