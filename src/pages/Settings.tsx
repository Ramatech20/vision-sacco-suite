import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings as SettingsIcon,
  Building2,
  Users,
  DollarSign,
  Shield,
  Bell,
  Database,
  Save,
  Upload,
  Download,
  Key,
  Mail,
  Phone,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Info,
  User,
  CreditCard,
  Crown,
  LogOut,
  Camera,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'organization');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const [settings, setSettings] = useState({
    organizationName: "Community SACCO",
    registrationNumber: "SACCO-2024-001",
    address: "123 Main Street, Nairobi, Kenya",
    phone: "+254-700-123-456",
    email: "admin@communitysacco.co.ke",
    website: "https://communitysacco.co.ke",
    defaultLoanInterestRate: "12.5",
    processingFee: "2.0",
    lateFeePercentage: "5.0",
    maxLoanAmount: "500000",
    minSavingsBalance: "1000",
    enableTwoFactor: true,
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    passwordMinLength: "8",
    sessionTimeout: "30",
    autoBackup: true,
    backupFrequency: "daily",
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Configure your SACCO platform preferences and policies
            </p>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-muted/50">
            <TabsTrigger value="organization" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Organization</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Manage your personal profile and account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a new avatar for your account
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@saccovision.com" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+254 700 123 456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="System Administrator" disabled />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password" 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleSave('Profile')}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="team" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Team Members
                </CardTitle>
                <CardDescription>
                  Manage your team members and their access levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Team Overview</h3>
                    <p className="text-sm text-muted-foreground">19 active team members</p>
                  </div>
                  <Button>Invite Member</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  {[
                    { name: "John Doe", role: "Administrator", email: "john.doe@saccovision.com", status: "Active" },
                    { name: "Sarah Wilson", role: "Manager", email: "sarah.wilson@saccovision.com", status: "Active" },
                    { name: "Mike Johnson", role: "Teller", email: "mike.johnson@saccovision.com", status: "Pending" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                        <Badge variant="outline">{member.role}</Badge>
                        <Button variant="ghost" size="sm">
                          <Key className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-xs">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Primary
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your recent billing history and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { date: "Dec 1, 2023", amount: "$29.99", status: "Paid" },
                    { date: "Nov 1, 2023", amount: "$29.99", status: "Paid" },
                    { date: "Oct 1, 2023", amount: "$29.99", status: "Paid" },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">Monthly subscription</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{invoice.amount}</span>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Subscription Plan
                </CardTitle>
                <CardDescription>
                  Manage your SACCOVision subscription and features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-6 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Professional Plan</h3>
                      <p className="text-muted-foreground">Perfect for growing SACCOs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$29.99</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Up to 500 members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Advanced analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Priority support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Custom reports</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Next billing date</p>
                    <p className="text-sm text-muted-foreground">January 1, 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Settings */}
          <TabsContent value="organization" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Organization Information
                </CardTitle>
                <CardDescription>
                  Basic information about your SACCO organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={settings.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input
                      id="regNumber"
                      value={settings.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={settings.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Organization')} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Organization Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users & Permissions */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    User Roles
                  </CardTitle>
                  <CardDescription>
                    Manage user roles and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Super Admin</p>
                        <p className="text-sm text-muted-foreground">Full system access</p>
                      </div>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        2 users
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Manager</p>
                        <p className="text-sm text-muted-foreground">Loan approval, reports</p>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        5 users
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Teller</p>
                        <p className="text-sm text-muted-foreground">Basic transactions</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        12 users
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Users className="w-4 h-4" />
                    Manage User Roles
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Monitor and manage active user sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">John Doe (Admin)</p>
                        <p className="text-sm text-muted-foreground">Last active: 2 minutes ago</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Sarah Wilson (Manager)</p>
                        <p className="text-sm text-muted-foreground">Last active: 15 minutes ago</p>
                      </div>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Away
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <Key className="w-4 h-4" />
                    View All Sessions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Settings */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Interest Rates & Fees
                  </CardTitle>
                  <CardDescription>
                    Configure default rates and fee structures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="loanRate">Default Loan Interest Rate (%)</Label>
                      <Input
                        id="loanRate"
                        type="number"
                        step="0.1"
                        value={settings.defaultLoanInterestRate}
                        onChange={(e) => handleInputChange('defaultLoanInterestRate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processingFee">Processing Fee (%)</Label>
                      <Input
                        id="processingFee"
                        type="number"
                        step="0.1"
                        value={settings.processingFee}
                        onChange={(e) => handleInputChange('processingFee', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="lateFee">Late Fee Percentage (%)</Label>
                      <Input
                        id="lateFee"
                        type="number"
                        step="0.1"
                        value={settings.lateFeePercentage}
                        onChange={(e) => handleInputChange('lateFeePercentage', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxLoan">Maximum Loan Amount</Label>
                      <Input
                        id="maxLoan"
                        type="number"
                        value={settings.maxLoanAmount}
                        onChange={(e) => handleInputChange('maxLoanAmount', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={() => handleSave('Financial')} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Financial Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Account Policies</CardTitle>
                  <CardDescription>
                    Set minimum balances and account requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minSavings">Minimum Savings Balance</Label>
                    <Input
                      id="minSavings"
                      type="number"
                      value={settings.minSavingsBalance}
                      onChange={(e) => handleInputChange('minSavingsBalance', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanToSavings">Loan-to-Savings Ratio</Label>
                    <Select defaultValue="3:1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2:1">2:1</SelectItem>
                        <SelectItem value="3:1">3:1</SelectItem>
                        <SelectItem value="4:1">4:1</SelectItem>
                        <SelectItem value="5:1">5:1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      These policies will apply to all new loan applications and account openings.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Policies
                </CardTitle>
                <CardDescription>
                  Configure authentication and security requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => handleInputChange('enableTwoFactor', checked)}
                  />
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passwordLength">Minimum Password Length</Label>
                    <Select 
                      value={settings.passwordMinLength} 
                      onValueChange={(value) => handleInputChange('passwordMinLength', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select 
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleInputChange('sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Changing security settings will require all users to log in again.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => handleSave('Security')} className="gap-2">
                  <Lock className="w-4 h-4" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when to send notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleInputChange('enableEmailNotifications', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableSmsNotifications}
                    onCheckedChange={(checked) => handleInputChange('enableSmsNotifications', checked)}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="space-y-3">
                    {[
                      'Loan applications',
                      'Payment reminders',
                      'Overdue payments',
                      'Account updates',
                      'System maintenance',
                    ].map((type) => (
                      <div key={type} className="flex items-center justify-between">
                        <Label className="text-sm">{type}</Label>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={() => handleSave('Notifications')} className="gap-2">
                  <Bell className="w-4 h-4" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    Backup & Recovery
                  </CardTitle>
                  <CardDescription>
                    Manage data backups and system recovery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable scheduled backups
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleInputChange('autoBackup', checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupFreq">Backup Frequency</Label>
                    <Select 
                      value={settings.backupFrequency}
                      onValueChange={(value) => handleInputChange('backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Upload className="w-4 h-4" />
                      Create Backup
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="w-4 h-4" />
                      Download Backup
                    </Button>
                  </div>
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Last backup: Today at 2:00 AM (Success)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>
                    Current system status and version information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Platform Version</span>
                      <span className="text-sm font-medium">SACCOVision v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Database Version</span>
                      <span className="text-sm font-medium">PostgreSQL 15.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">System Status</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Update</span>
                      <span className="text-sm font-medium">January 15, 2024</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <Info className="w-4 h-4" />
                    System Diagnostics
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

export default Settings;