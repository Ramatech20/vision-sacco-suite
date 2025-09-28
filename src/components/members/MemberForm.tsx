import { useState } from "react";
import { createMember, updateMember } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MemberFormProps {
  member?: any;
  onSuccess?: () => void;
}

export default function MemberForm({ member, onSuccess }: MemberFormProps) {
  const [firstName, setFirstName] = useState(member?.firstName || "");
  const [lastName, setLastName] = useState(member?.lastName || "");
  const [nationalId, setNationalId] = useState(member?.nationalId || "");
  const [phone, setPhone] = useState(member?.phone || "");
  const [email, setEmail] = useState(member?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (member?.id) {
        await updateMember(member.id, { firstName, lastName, nationalId, phone, email });
      } else {
        await createMember({ firstName, lastName, nationalId, phone, email });
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-card">
      <CardHeader>
        <CardTitle>{member ? "Update Member" : "Create Member"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="National ID"
            value={nationalId}
            onChange={e => setNationalId(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (member ? "Updating..." : "Creating...") : member ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
