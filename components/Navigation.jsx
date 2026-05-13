"use client";

import Link
from "next/link";

import { usePathname }
from "next/navigation";

import { useRouter }
from "next/navigation";

import { useState }
from "react";

import { Menu, X }
from "lucide-react";

import { supabase }
from "../lib/supabase";

const NAV_ITEMS = [

  {
    label:
      "Dashboard",

    href:
      "/dashboard",
  },

  {
    label:
      "Cognitive Forge",

    href:
      "/magicpen",
  },

  {
    label:
      "Guide",

    href:
      "/guide",
  },

];

export default function Navigation() {

  const pathname =
    usePathname();

  const router =
    useRouter();

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  // =========================
  // LOGOUT
  // =========================

  async function handleLogout() {

    try {

      await supabase.auth.signOut();

      router.push("/login");

    }

    catch (error) {

      console.error(error);

    }

  }

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/40 bg-white/70">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="h-[78px] flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-10">

            {/* LOGO */}

            <Link
              href="/dashboard"
              className="flex flex-col"
            >

              <span className="text-[11px] uppercase tracking-[0.35em] text-[#94A3B8] font-medium">

                PipuPath

              </span>

              <span className="text-[20px] font-semibold tracking-tight text-[#0F172A]">

                Development OS

              </span>

            </Link>

            {/* DESKTOP NAV */}

            <div className="hidden md:flex items-center gap-2">

              {

                NAV_ITEMS.map((item) => {

                  const active =

                    pathname ===
                    item.href;

                  return (

                    <Link

                      key={item.href}

                      href={item.href}

                      className={`

px-5
py-3
rounded-2xl
text-sm
font-medium
transition-all
duration-300

${

  active

    ?

    "bg-[#0F172A] text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"

    :

    "text-[#64748B] hover:bg-white hover:text-[#0F172A]"

}

`}

                    >

                      {item.label}

                    </Link>

                  );

                })

              }

            </div>

          </div>

          {/* RIGHT */}

          <div className="hidden md:flex items-center gap-4">

            {/* STATUS */}

            <div className="px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0]">

              <p className="text-xs uppercase tracking-[0.2em] text-[#94A3B8]">

                Adaptive Environment Active

              </p>

            </div>

            {/* LOGOUT */}

            <button

              onClick={
                handleLogout
              }

              className="px-5 py-3 rounded-2xl bg-[#0F172A] text-white text-sm font-medium hover:opacity-90 transition-all"

            >

              Logout

            </button>

          </div>

          {/* MOBILE BUTTON */}

          <button

            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }

            className="md:hidden w-11 h-11 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center"

          >

            {

              mobileMenu

                ?

                <X size={20} />

                :

                <Menu size={20} />

            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {

        mobileMenu && (

          <div className="md:hidden border-t border-[#E2E8F0] bg-white/95 backdrop-blur-xl">

            <div className="px-4 py-5 space-y-3">

              {

                NAV_ITEMS.map((item) => {

                  const active =

                    pathname ===
                    item.href;

                  return (

                    <Link

                      key={item.href}

                      href={item.href}

                      onClick={() =>
                        setMobileMenu(false)
                      }

                      className={`

block
px-5
py-4
rounded-2xl
text-sm
font-medium
transition-all

${

  active

    ?

    "bg-[#0F172A] text-white"

    :

    "bg-[#F8FAFC] text-[#64748B]"

}

`}

                    >

                      {item.label}

                    </Link>

                  );

                })

              }

              {/* MOBILE LOGOUT */}

              <button

                onClick={
                  handleLogout
                }

                className="w-full mt-3 px-5 py-4 rounded-2xl bg-[#0F172A] text-white text-sm font-medium"

              >

                Logout

              </button>

            </div>

          </div>

        )

      }

    </nav>

  );

}