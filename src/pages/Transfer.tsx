import TransferForm from "@/components/accounts/TransferForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function TransferPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <TransferForm />
      </div>
    </DashboardLayout>
  );
}
