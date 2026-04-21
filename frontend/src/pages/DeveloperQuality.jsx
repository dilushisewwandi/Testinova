import DashboardLayout from "../layouts/DashboardLayout";
import RoleBasedReport from "../components/RoleBasedReport";

export default function DeveloperQuality() {
  return (
    <DashboardLayout role="developer">
      <RoleBasedReport role="developer" />
    </DashboardLayout>
  );
}