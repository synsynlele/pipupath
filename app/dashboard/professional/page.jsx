import ProtectedRoute

from "@/components/auth/ProtectedRoute";

import DashboardShell

from "@/components/dashboard/DashboardShell";

export default function ProfessionalDashboard(){

  return (

    <ProtectedRoute
      requiredPath="Professional"
    >

      <DashboardShell

        identity="Professional"

        title="Optimize Career Trajectory."

        subtitle="
        Your growth accelerates
        when skill leverage compounds
        consistently over time.
        "

      />

    </ProtectedRoute>

  );

}