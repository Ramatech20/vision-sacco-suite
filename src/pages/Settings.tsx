import { useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
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

        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="organization" className="gap-2">
              <Building2 className="w-4 h-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="financial" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Database className="w-4 h-4" />
              System
            </TabsTrigger>
          </TabsList>

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