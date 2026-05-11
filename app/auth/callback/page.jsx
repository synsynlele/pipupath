"use client";

import { useEffect } from "react";

import { useRouter }

from "next/navigation";

import { supabase }

from "@/lib/supabase";

import { getDashboardRoute }

from "@/lib/dashboardRouter";

export default function AuthCallbackPage(){

  const router = useRouter();

  useEffect(() => {

    async function handleAuth(){

      const {

        data: { session }

      } = await supabase.auth.getSession();

      // NO SESSION
      if(!session){

        router.push("/");

        return;

      }

      // RESTORE IDENTITY
      const identity =
        localStorage.getItem(
          "pipupath_identity"
        );

      // NO IDENTITY
      if(!identity){

        router.push("/");

        return;

      }

      // ROUTE USER
      const route =
        getDashboardRoute(identity);

      router.push(route);

    }

    handleAuth();

  }, [router]);

  return (

    <main
      className="
      min-h-screen
      bg-[#050816]
      text-white
      flex
      items-center
      justify-center
      "
    >

      <div className="text-center">

        <div
          className="
          text-5xl
          font-black
          "
        >

          Activating PipuPath...

        </div>

        <p
          className="
          mt-4
          text-white/60
          "
        >

          Restoring your adaptive environment.

        </p>

      </div>

    </main>

  );

}