// import React from "react";
// import DashboardLayout from "../layouts/DashboardLayout";
// import RoleBasedReport from "./RoleBasedReport";

// // simple wrapper for the generic report component that adds the
// // developer layout. the bug report card should navigate here.
// export default function DeveloperReports() {
//   return (
//     <DashboardLayout role="developer">
//       <RoleBasedReport role="developer" />
//     </DashboardLayout>
//   );
// }


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