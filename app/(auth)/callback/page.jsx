"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {

  const router = useRouter();

  useEffect(() => {

    async function handleAuth() {

      await supabase.auth.getSession();

      router.push("/dashboard");
    }

    handleAuth();

  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

      <p className="text-gray-600">
        Signing you in...
      </p>

    </main>
  );
}