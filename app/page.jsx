"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";

import Hero from "../components/Hero";

import { useAuth }
from "../context/AuthContext";

export default function HomePage() {

  const router = useRouter();

  const { user, loading } =
    useAuth();

  useEffect(() => {

    if (!loading && user) {

      router.push("/dashboard");
    }

  }, [user, loading, router]);

  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">

        <p className="text-gray-600">
          Loading...
        </p>

      </main>
    );
  }

  // Prevent flash of landing page
  if (user) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">

      <Navbar />

      <Hero />

    </main>
  );
}