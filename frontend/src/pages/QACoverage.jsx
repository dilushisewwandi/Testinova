import DashboardLayout from "../layouts/DashboardLayout";
import RoleBasedReport from "./RoleBasedReport";

export default function QACoverage() {
  return (
    <DashboardLayout role="qa">
      <RoleBasedReport role="qa" />
    </DashboardLayout>
  );
}

