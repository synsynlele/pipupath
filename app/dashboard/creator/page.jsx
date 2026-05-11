import ProtectedRoute

from "@/components/auth/ProtectedRoute";

import DashboardShell

from "@/components/dashboard/DashboardShell";

export default function CreatorDashboard(){

  return (

    <ProtectedRoute
      requiredPath="Creator"
    >

      <DashboardShell

        identity="Creator"

        title="Create With Consistency."

        subtitle="
        Sustainable creativity grows
        when recovery systems support
        long-term output.
        "

      />

    </ProtectedRoute>

  );

}