"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "@/context/AuthContext";

import { supabase }
from "@/lib/supabase";

import useProfileStore
from "@/stores/profileStore";

export default function ProtectedRoute({
  children,
}) {

  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

const {
  hydrateProfile,
} = useProfileStore();

  useEffect(() => {

  async function hydrate() {

    if (loading) return;

    if (!user) {

      router.push("/login");

      return;
    }

    const {
      data: profile,
      error,
    } =
      await supabase
        .from("profiles")
        .select("*")
        .eq(
          "id",
          user.id
        )
        .single();

    if (error) {

      console.error(error);

      return;
    }

    hydrateProfile(profile);
  }

  hydrate();

}, [
  user,
  loading,
  router,
]);

  if (loading) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-slate-400">

        Preparing your builder environment...

      </main>

    );
  }

  if (!user) return null;

  return children;
}