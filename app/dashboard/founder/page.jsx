import ProtectedRoute

from "@/components/auth/ProtectedRoute";

import DashboardShell

from "@/components/dashboard/DashboardShell";

export default function FounderDashboard(){

  return (

    <ProtectedRoute
      requiredPath="Founder"
    >

      <DashboardShell

        identity="Founder"

        title="Scale Without Collapse."

        subtitle="
        Your execution potential increases
        when systems become stronger
        than willpower.
        "

      />

    </ProtectedRoute>

  );

}