"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage(){

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e){

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({

      email

    });

    setLoading(false);

    if(error){

      alert(error.message);

      return;

    }

    alert(
      "Check your email for login link."
    );

    router.push("/");

  }

  return (

    <main
      className="
      min-h-screen
      bg-[#050816]
      text-white
      flex
      items-center
      justify-center
      p-6
      "
    >

      <div
        className="
        w-full
        max-w-md
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        p-8
        "
      >

        <div className="text-white/40 text-sm">

          PipuPath Identity Access

        </div>

        <h1
          className="
          mt-4
          text-5xl
          font-black
          tracking-tight
          "
        >

          Login

        </h1>

        <p
          className="
          mt-4
          text-white/60
          leading-relaxed
          "
        >

          Continue into your adaptive
          human operating system.

        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8"
        >

          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-black/20
            px-5
            py-4
            outline-none
            text-white
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
            mt-5
            w-full
            rounded-2xl
            bg-[#D4A43B]
            text-black
            font-bold
            py-4
            "
          >

            {
              loading
              ? "Sending..."
              : "Continue"
            }

          </button>

        </form>

      </div>

    </main>

  );

}