"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {

const router = useRouter();

const {
user,
loading: authLoading,
} = useAuth();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [loading, setLoading] =
useState(false);

useEffect(() => {


if (!authLoading && user) {

  router.push("/welcome");
}


}, [
user,
authLoading,
router,
]);

async function handleSignup(e) {


e.preventDefault();

setLoading(true);

const {
  data,
  error,
} = await supabase.auth.signUp({
  email,
  password,
});

setLoading(false);

if (!error && data?.user) {

  router.push("/welcome");

} else if (error) {

  alert(error.message);
}


}

async function handleGoogleSignup() {


const { error } =
  await supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: {
  redirectTo:
  window.location.origin +
  "/welcome",
},
    });

if (error) {

  alert(error.message);
}


}

if (authLoading) {

return (
  <main className="flex min-h-screen items-center justify-center bg-[#050816]">

    <p className="text-slate-400">
      Preparing your builder environment...
    </p>

  </main>
);


}

if (user) return null;

return (


<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6 text-white">

  {/* BACKGROUND */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

    <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

  </div>

  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
  >

    {/* LOGO */}

    <div className="flex flex-col items-center">

      <Image
        src="/logo.png"
        alt="PipuPath Logo"
        width={72}
        height={72}
        priority
        className="object-contain"
      />

      <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-white">

        Begin Your Builder Journey

      </h1>

      <p className="mt-3 text-center leading-relaxed text-slate-400">

        Discover your strengths,
        build valuable skills,
        and create meaningful opportunities.

      </p>

    </div>

    {/* GOOGLE */}

    <button
      type="button"
      onClick={handleGoogleSignup}
      className="
        mt-10
        w-full
        rounded-2xl
        border
        border-white/10
        bg-white/10
        px-5
        py-4
        font-semibold
        text-white
        backdrop-blur-xl
        transition-all
        hover:bg-white/15
      "
    >
      Continue with Google
    </button>

    {/* DIVIDER */}

    <div className="my-8 flex items-center gap-4">

      <div className="h-px flex-1 bg-white/10" />

      <span className="text-xs tracking-wide text-slate-500">

        OR USE EMAIL

      </span>

      <div className="h-px flex-1 bg-white/10" />

    </div>

    {/* FORM */}

    <form onSubmit={handleSignup}>

      <div className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-blue-400/40
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-blue-400/40
          "
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          mt-6
          w-full
          rounded-2xl
          bg-blue-500
          px-5
          py-4
          font-semibold
          text-white
          shadow-[0_0_30px_rgba(59,130,246,0.35)]
          transition-all
          hover:scale-[1.01]
        "
      >

        {loading
          ? "Loading..."
          : "Continue with Email"}

      </button>

    </form>

    {/* LOGIN */}

    <p className="mt-8 text-center text-sm text-slate-400">

      Already building?{" "}

      <Link
        href="/login"
        className="font-semibold text-blue-300"
      >
        Continue journey
      </Link>

    </p>

  </motion.div>

</main>


);
}
