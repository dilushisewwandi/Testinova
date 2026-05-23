import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import TestQualityReports from "./TestQualityReports";

export default function DeveloperReports() {
  return (
    <DashboardLayout role="developer">
      <TestQualityReports />
    </DashboardLayout>
  );
}