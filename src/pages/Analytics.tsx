import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, PieChart, Activity, Download, RefreshCw } from "lucide-react";

export default function Analytics() {
  const analyticsMetrics = [
    {
      title: "Total Portfolio Value",
      value: "KSh 6,295,000",
      change: "+14%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "All assets combined"
    },
    {
      title: "Member Engagement",
      value: "92.4%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Activity,
      description: "Active participation"
    },
    {
      title: "Revenue Growth",
      value: "18.5%",
      change: "+3%",
      changeType: "positive" as const,
      icon: BarChart3,
      description: "Quarterly growth"
    },
    {
      title: "Risk Score",
      value: "2.8/10",
      change: "-0.5",
      changeType: "positive" as const,
      icon: PieChart,
      description: "Low risk profile"
    }
  ];

  const performanceData = [
    { month: "Jan", revenue: 85000, expenses: 65000, profit: 20000, members: 200 },
    { month: "Feb", revenue: 92000, expenses: 68000, profit: 24000, members: 215 },
    { month: "Mar", revenue: 98000, expenses: 72000, profit: 26000, members: 233 },
    { month: "Apr", revenue: 105000, expenses: 75000, profit: 30000, members: 255 },
    { month: "May", revenue: 112000, expenses: 78000, profit: 34000, members: 274 },
    { month: "Jun", revenue: 118000, expenses: 80000, profit: 38000, members: 297 }
  ];

  const portfolioData = [
    { category: "Loans", amount: 2450000, percentage: 39 },
    { category: "Savings", amount: 3850000, percentage: 61 },
    { category: "Investments", amount: 450000, percentage: 7 },
    { category: "Cash Reserve", amount: 295000, percentage: 5 }
  ];

  const riskMetrics = [
    { metric: "Loan Default Rate", value: "3.2%", benchmark: "5.0%", status: "Good" },
    { metric: "Liquidity Ratio", value: "15.8%", benchmark: "10.0%", status: "Excellent" },
    { metric: "Capital Adequacy", value: "18.5%", benchmark: "12.0%", status: "Excellent" },
    { metric: "Member Retention", value: "94.5%", benchmark: "90.0%", status: "Good" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive financial analysis and performance metrics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <FinancialChart
                title="Revenue vs Profit Trends"
                description="Monthly financial performance"
                data={performanceData}
                type="line"
                dataKey="revenue"
                secondaryDataKey="profit"
                color="hsl(var(--primary))"
                height={350}
              />
              <FinancialChart
                title="Member Growth Impact"
                description="Correlation between members and revenue"
                data={performanceData}
                type="area"
                dataKey="members"
                color="hsl(var(--success))"
                height={350}
              />
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Asset distribution breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">KSh {item.amount.toLocaleString()}</span>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Indicators</CardTitle>
                  <CardDescription>Key financial ratios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Return on Assets</span>
                    <span className="text-sm font-medium">8.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Loan-to-Deposit Ratio</span>
                    <span className="text-sm font-medium">63.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Operating Efficiency</span>
                    <span className="text-sm font-medium">67.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Net Interest Margin</span>
                    <span className="text-sm font-medium">12.4%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Matrix</CardTitle>
                <CardDescription>Current vs benchmark performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{metric.metric}</h4>
                        <p className="text-xs text-muted-foreground">Current: {metric.value} | Benchmark: {metric.benchmark}</p>
                      </div>
                      <Badge 
                        className={
                          metric.status === "Excellent" 
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-6">
              <FinancialChart
                title="Comprehensive Financial Trends"
                description="All key metrics over time"
                data={performanceData}
                type="line"
                dataKey="revenue"
                secondaryDataKey="expenses"
                color="hsl(var(--primary))"
                height={400}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}