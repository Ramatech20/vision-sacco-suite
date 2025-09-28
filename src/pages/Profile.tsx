import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { getUserMe } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserMe()
      .then(setUser)
      .catch(() => {
        toast.error("Failed to fetch user profile");
        setError("Failed to fetch user profile");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  // Error feedback handled by toast notification
  if (!user) return <div className="p-8 text-center">No user data found.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><strong>Name:</strong> {user.name || user.firstName + " " + user.lastName}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Role:</strong> {user.role}</div>
          <div><strong>Joined:</strong> {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "-"}</div>
        </CardContent>
      </Card>
    </div>
  );
}
