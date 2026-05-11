"use client";

import { useEffect }

from "react";

import { useRouter }

from "next/navigation";

import useAuth

from "@/hooks/useAuth";

import { getDashboardRoute }

from "@/lib/dashboardRouter";

export default function ProtectedRoute({

  children,

  requiredPath

}) {

  const router = useRouter();

  const {
    user,
    loading
  } = useAuth();

  useEffect(() => {

    // WAIT FOR SESSION HYDRATION
    if(loading) return;

    // NO USER
    if(!user){

      router.push("/");

      return;

    }

    // CHECK IDENTITY
    const identity =
      localStorage.getItem(
        "pipupath_identity"
      );

    if(!identity){

      router.push("/");

      return;

    }

    // WRONG DASHBOARD
    if(

      requiredPath &&

      identity !== requiredPath

    ){

      const correctRoute =
        getDashboardRoute(identity);

      router.push(correctRoute);

    }

  }, [

    user,

    loading,

    router,

    requiredPath

  ]);

  // LOADING STATE
  if(loading){

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
            text-4xl
            font-black
            "
          >

            Restoring PipuPath...

          </div>

          <p
            className="
            mt-4
            text-white/60
            "
          >

            Rebuilding your adaptive environment.

          </p>

        </div>

      </main>

    );

  }

  // NO USER AFTER LOADING
  if(!user){

    return null;

  }

  return children;

}