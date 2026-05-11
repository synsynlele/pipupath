"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="PipuPath Logo"
            width={42}
            height={42}
            priority
            className="object-contain"
          />

          <span className="text-xl font-bold text-[#0F172A]">
            PipuPath
          </span>

        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="text-sm font-medium text-[#0F172A]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#0F172A] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}