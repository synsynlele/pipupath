'use client';

import Link from "next/link";

export default function NavBar(){

  return (
    <div className="flex gap-6 p-4 border-b border-zinc-800 bg-black text-white">

      <Link href="/dashboard">
        Dashboard
      </Link>

      <Link href="/magicpen">
        MagicPen
      </Link>

      <Link href="/guides">
        Guides
      </Link>

    </div>
  );
}