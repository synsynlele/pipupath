import ProtectedRoute

from "@/components/auth/ProtectedRoute";

import DashboardShell

from "@/components/dashboard/DashboardShell";

export default function StudentDashboard(){

  return (

    <ProtectedRoute
      requiredPath="Student"
    >

      <DashboardShell

        identity="Student"

        title="Build Academic Momentum."

        subtitle="
        Your learning trajectory improves
        when consistency becomes stronger
        than motivation.
        "

      />

    </ProtectedRoute>

  );

}