import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Users, Mail, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserRole = 'admin' | 'member' | 'staff';

interface UserWithRoles {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  created_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("staff");
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine data
      const usersWithRoles = profiles?.map(profile => ({
        id: profile.id,
        email: profile.email || '',
        name: profile.name || 'Unknown',
        roles: userRoles
          ?.filter(ur => ur.user_id === profile.id)
          .map(ur => ur.role as UserRole) || [],
        created_at: profile.created_at,
      })) || [];

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast.error(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addRole = async (userId: string, role: UserRole) => {
    setProcessingUserId(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast.error("User already has this role");
        } else {
          throw error;
        }
        return;
      }

      toast.success(`Role ${role} added successfully`);
      await fetchUsers();
    } catch (error: any) {
      toast.error(`Error adding role: ${error.message}`);
    } finally {
      setProcessingUserId(null);
    }
  };

  const removeRole = async (userId: string, role: UserRole) => {
    setProcessingUserId(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast.success(`Role ${role} removed successfully`);
      await fetchUsers();
    } catch (error: any) {
      toast.error(`Error removing role: ${error.message}`);
    } finally {
      setProcessingUserId(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
    user.name.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-8 h-8" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage user roles and permissions
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Add or remove roles for users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Users</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by email or name..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Current Roles</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                {user.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {user.roles.length === 0 ? (
                                  <Badge variant="outline">No roles</Badge>
                                ) : (
                                  user.roles.map((role) => (
                                    <Badge
                                      key={role}
                                      variant={role === 'admin' ? 'default' : 'secondary'}
                                      className="cursor-pointer"
                                      onClick={() => removeRole(user.id, role)}
                                    >
                                      {role} ×
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Select
                                  disabled={processingUserId === user.id}
                                  onValueChange={(value) => addRole(user.id, value as UserRole)}
                                >
                                  <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Add role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>Understanding user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="default">Admin</Badge>
              <p className="text-sm text-muted-foreground">
                Full access to all features including user management, settings, and all data operations
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="secondary">Staff</Badge>
              <p className="text-sm text-muted-foreground">
                Access to member management, transaction processing, loan approvals, and reports
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline">Member</Badge>
              <p className="text-sm text-muted-foreground">
                Access to personal dashboard, loan applications, and savings information
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
