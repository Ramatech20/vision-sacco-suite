import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, UserCheck, TrendingUp, Plus, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Members() {
  const memberMetrics = [
    {
      title: "Total Members",
      value: "247",
      change: "+23",
      changeType: "positive" as const,
      icon: Users,
      description: "Active members"
    },
    {
      title: "New This Month",
      value: "18",
      change: "+125%",
      changeType: "positive" as const,
      icon: UserPlus,
      description: "New registrations"
    },
    {
      title: "Active Members",
      value: "234",
      change: "+5%",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "95% activity rate"
    },
    {
      title: "Member Growth",
      value: "12%",
      change: "+3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Quarterly growth"
    }
  ];

  const memberGrowthData = [
    { month: "Jan", newMembers: 12, totalMembers: 200, activeMembers: 185 },
    { month: "Feb", newMembers: 15, totalMembers: 215, activeMembers: 198 },
    { month: "Mar", newMembers: 18, totalMembers: 233, activeMembers: 220 },
    { month: "Apr", newMembers: 22, totalMembers: 255, activeMembers: 240 },
    { month: "May", newMembers: 19, totalMembers: 274, activeMembers: 258 },
    { month: "Jun", newMembers: 23, totalMembers: 297, activeMembers: 278 }
  ];

  const memberColumns = [
    { key: "memberNo", label: "Member #", type: "text" as const },
    { key: "name", label: "Full Name", type: "text" as const },
    { key: "phone", label: "Phone", type: "text" as const },
    { key: "joinDate", label: "Join Date", type: "date" as const },
    { key: "savings", label: "Savings Balance", type: "currency" as const },
    { key: "status", label: "Status", type: "status" as const }
  ];

  const membersData = [
    { memberNo: "M001", name: "Mary Wanjiku Kiprotich", phone: "+254 701 234567", joinDate: "2023-01-15", savings: 45000, status: "Active" },
    { memberNo: "M002", name: "John Kimani Mwangi", phone: "+254 722 345678", joinDate: "2023-02-20", savings: 32000, status: "Active" },
    { memberNo: "M003", name: "Grace Achieng Odhiambo", phone: "+254 733 456789", joinDate: "2023-03-10", savings: 67000, status: "Active" },
    { memberNo: "M004", name: "Peter Mwangi Njoroge", phone: "+254 744 567890", joinDate: "2022-12-05", savings: 28000, status: "Inactive" },
    { memberNo: "M005", name: "Sarah Nyong'o Otieno", phone: "+254 755 678901", joinDate: "2023-04-18", savings: 51000, status: "Active" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Member Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage member information and track membership growth
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {memberMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FinancialChart
            title="Member Growth Trend"
            description="Monthly new member acquisitions"
            data={memberGrowthData}
            type="bar"
            dataKey="newMembers"
            color="hsl(var(--primary))"
            height={300}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Member Statistics</CardTitle>
              <CardDescription>Key membership insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Gender Distribution</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Female: 62%</span>
                  <span className="text-sm text-muted-foreground">Male: 38%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Age Groups</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">25-35: 45%</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Tenure</span>
                <span className="text-sm font-medium">18 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Retention Rate</span>
                <span className="text-sm font-medium">94.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Directory</CardTitle>
            <CardDescription>Search and manage member information</CardDescription>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search members..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Member List"
              description="Complete member directory with key information"
              columns={memberColumns}
              data={membersData}
              actions
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}