import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMember, updateMember } from "@/lib/api";
import { toast } from "sonner";

interface MemberFormProps {
  member?: any;
  onSuccess?: () => void;
}

export function MemberForm({ member, onSuccess }: MemberFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setFirstName(member.first_name || "");
      setLastName(member.last_name || "");
      setNationalId(member.national_id || "");
      setPhone(member.phone || "");
    } else {
      setFirstName("");
      setLastName("");
      setNationalId("");
      setPhone("");
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { 
      first_name: firstName, 
      last_name: lastName, 
      national_id: nationalId, 
      phone 
    };

    try {
      if (member?.id) {
        await updateMember(member.id, data);
        toast.success("Member updated successfully");
      } else {
        await createMember(data);
        toast.success("Member created successfully");
      }
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nationalId">National ID</Label>
        <Input
          id="nationalId"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : member ? "Update Member" : "Create Member"}
        </Button>
      </div>
    </form>
  );
}
