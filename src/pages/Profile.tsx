import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserProfile } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    member_id: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        member_id: data.member_id || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          member_id: formData.member_id,
        })
        .eq('id', user?.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      loadProfile();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Read-only)</Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="member_id">Member ID</Label>
                <Input
                  id="member_id"
                  value={formData.member_id}
                  onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                  placeholder="Enter your member ID"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm">
                  {profile?.role || "member"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm">
                  {profile?.status || "active"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Member Since</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "-"}
                </div>
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
