"use client";

import { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (!error) {
      router.push("/dashboard");
    } else {
      alert(error.message);
    }
  }

  async function handleGoogleLogin() {

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
         redirectTo:
  `${window.location.origin}/auth/callback`
        },
      });

    if (error) {
      alert(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-200">

        {/* Logo */}
        <div className="flex flex-col items-center">

          <Image
            src="/logo.png"
            alt="PipuPath Logo"
            width={64}
            height={64}
            priority
            className="object-contain"
          />

          <h1 className="mt-4 text-3xl font-bold text-[#0F172A]">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-600 text-center">
            Continue your growth journey.
          </p>

        </div>

        {/* Google Login Primary */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-8 bg-[#0F172A] text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">

          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-sm text-gray-500">
            OR USE EMAIL
          </span>

          <div className="flex-1 h-px bg-gray-200" />

        </div>

        {/* Email Form */}
        <form
          onSubmit={handleLogin}
        >

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black outline-none focus:border-[#0F172A]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-black outline-none focus:border-[#0F172A]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 border border-[#0F172A] text-[#0F172A] py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            {loading ? "Loading..." : "Login with Email"}
          </button>

        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">

          Don&apos;t have an account?{" "}

          <Link
            href="/signup"
            className="font-medium text-[#D4A017]"
          >
            Sign up
          </Link>

        </p>

      </div>

    </main>
  );
}