import ProtectedRoute

from "@/components/auth/ProtectedRoute";

import DashboardShell

from "@/components/dashboard/DashboardShell";

export default function SchoolDashboard(){

  return (

    <ProtectedRoute
      requiredPath="School Leader"
    >

      <DashboardShell

        identity="School Leader"

        title="Build Human Infrastructure."

        subtitle="
        Educational transformation scales
        when systems consistently produce
        human growth outcomes.
        "

      />

    </ProtectedRoute>

  );

}