"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({

  children,

  requiredPath

}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if(loading) return;

    // NOT LOGGED IN
    if(!user){

  return;

}

    // CHECK ONBOARDING
    const selectedPath =
      localStorage.getItem(
        "pipupath_selected_path"
      );

    if(!selectedPath){

      router.push("/");

      return;

    }

    // WRONG DASHBOARD
    if(

      requiredPath &&

      selectedPath !== requiredPath

    ){

      switch(selectedPath){

        case "Student":
          router.push("/dashboard/student");
          break;

        case "Founder":
          router.push("/dashboard/founder");
          break;

        case "Professional":
          router.push("/dashboard/professional");
          break;

        case "Creator":
          router.push("/dashboard/creator");
          break;

        case "School Leader":
          router.push("/dashboard/school");
          break;

        default:
          router.push("/");
          break;

      }

    }

  }, [

    user,

    loading,

    router,

    requiredPath

  ]);

  if(loading){

    return (

      <div
        className="
        min-h-screen
        bg-[#050816]
        text-white
        flex
        items-center
        justify-center
        "
      >

        Loading PipuPath...

      </div>

    );

  }

  if(!user){

    return null;

  }

  return children;

}