'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NavBar from "@/components/NavBar";

export default function DashboardPage(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    async function loadUser(){

      const { data } = await supabase.auth.getUser();

      if(data?.user){
        setUser(data.user);
      }
    }

    loadUser();

  },[]);

  return (
    <div className="min-h-screen bg-black text-white">

      <NavBar />

      <div className="p-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-zinc-400">
          Welcome back
          {user?.email ? `, ${user.email}` : ""}
        </p>

      </div>

    </div>
  );
}