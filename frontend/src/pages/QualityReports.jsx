import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import RoleBasedReport from "./RoleBasedReport";

export default function QualityReports() {
  return (
    <DashboardLayout role="qa">
      <RoleBasedReport role="qa" />
    </DashboardLayout>
  );
}