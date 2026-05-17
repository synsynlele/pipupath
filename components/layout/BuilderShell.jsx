"use client";

import Image from "next/image";

import Link from "next/link";

import { usePathname }
from "next/navigation";

import { useRouter }
from "next/navigation";

import {
  Home,
  PenSquare,
  Compass,
  User,
  LogOut,
} from "lucide-react";

import { supabase }
from "@/lib/supabase";

const navItems = [

  {
    label: "Journey",
    href: "/journey",
    icon: Home,
  },

  {
    label: "MagicPen",
    href: "/magicpen",
    icon: PenSquare,
  },

  {
    label: "NortnSpoil",
    href: "/nortnspoil",
    icon: Compass,
  },

  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function BuilderShell({
  children,
  title = "PipuPath",
  subtitle = "Builder Intelligence",
}) {

  const pathname =
    usePathname();

  const router =
    useRouter();

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/");
  }

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl" />

      </div>

      {/* TOPBAR */}

      <header className="relative z-20 border-b border-white/5 bg-black/10 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="PipuPath Logo"
              width={42}
              height={42}
              priority
              className="object-contain"
            />

            <div className="flex flex-col leading-tight">

              <span className="text-lg font-semibold tracking-tight text-white">

                {title}

              </span>

              <span className="text-xs text-slate-400">

                {subtitle}

              </span>

            </div>

          </div>

          {/* NAV */}

          <nav className="hidden items-center gap-2 md:flex">

            {navItems.map((item) => {

              const Icon =
                item.icon;

              const active =
                pathname === item.href;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    px-4
                    py-2
                    text-sm
                    transition-all

                    ${
                      active
                        ? `
                          bg-blue-500/20
                          text-blue-300
                        `
                        : `
                          text-slate-400
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >

                  <Icon size={16} />

                  {item.label}

                </Link>

              );
            })}

          </nav>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-slate-300
              transition-all
              hover:bg-white/10
            "
          >

            <LogOut size={16} />

            Logout

          </button>

        </div>

      </header>

      {/* CONTENT */}

      <div className="relative z-10 mx-auto w-full max-w-[620px] px-6 py-10">

        {children}

      </div>

      {/* MOBILE NAV */}

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#050816]/90 backdrop-blur-xl md:hidden">

        <div className="flex items-center justify-around py-4">

          {navItems.map((item) => {

            const Icon =
              item.icon;

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  flex-col
                  items-center
                  gap-1
                  text-xs

                  ${
                    active
                      ? "text-blue-300"
                      : "text-slate-500"
                  }
                `}
              >

                <Icon size={20} />

                {item.label}

              </Link>

            );
          })}

        </div>

      </div>

    </main>
  );
}