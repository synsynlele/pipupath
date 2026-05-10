"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NavBar() {

  const router = useRouter();

  const [isGuide, setIsGuide] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkGuide() {

      const { data: userData } =
        await supabase.auth.getUser();

      if (!userData?.user) {

        setLoading(false);

        return;
      }

      const { data } = await supabase
        .from("guides")
        .select("id")
        .eq("user_id", userData.user.id)
        .single();

      if (data) {
        setIsGuide(true);
      }

      setLoading(false);

    }

    checkGuide();

  }, []);

  async function logout() {

    await supabase.auth.signOut();

    router.push("/");

  }

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard"
    },
    {
      href: "/discover",
      label: "Discover"
    },
    {
      href: "/magicpen",
      label: "MagicPen"
    },
    {
      href: "/business",
      label: "Business"
    },
    {
      href: "/guides",
      label: "Guides"
    }
  ];

  return (

    <div className="w-full border-b border-[#2a2112] bg-gradient-to-b from-[#050300] to-[#0c0903] sticky top-0 z-50 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-center justify-between py-4">

          {/* LOGO */}

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.png"
              alt="PipuPath"
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl shadow-[0_8px_30px_rgba(212,164,59,0.18)]"
            />

            <div>

              <h1 className="text-[#F7E8C5] font-bold text-xl md:text-2xl tracking-tight">
                PipuPath
              </h1>

              <p className="text-[#D4A43B] text-[10px] md:text-xs tracking-[0.3em] uppercase">
                Guided Growth OS
              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden lg:flex items-center gap-8 text-sm">

            {
              navLinks.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
                >
                  {link.label}
                </Link>

              ))
            }

            {
              !loading && (

                isGuide ? (

                  <Link
                    href="/guide-dashboard"
                    className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
                  >
                    Guide Dashboard
                  </Link>

                ) : (

                  <Link
                    href="/become-guide"
                    className="text-[#F7E8C5]/75 hover:text-[#D4A43B] transition"
                  >
                    Become a Guide
                  </Link>

                )

              )
            }

            <button
              onClick={logout}
              className="
                px-4
                py-2
                rounded-xl
                border
                border-[#2a2112]
                text-[#F7E8C5]/70
                hover:text-[#D4A43B]
                hover:border-[#D4A43B]/40
                transition
              "
            >
              Sign Out
            </button>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }

            className="
              lg:hidden
              text-[#F7E8C5]
              text-3xl
            "
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>

        </div>

        {/* MOBILE MENU */}

        {
          mobileMenuOpen && (

            <div
              className="
                lg:hidden
                pb-6
                flex
                flex-col
                gap-4
              "
            >

              {
                navLinks.map((link) => (

                  <Link
                    key={link.href}
                    href={link.href}

                    onClick={() =>
                      setMobileMenuOpen(false)
                    }

                    className="
                      text-[#F7E8C5]/80
                      hover:text-[#D4A43B]
                      transition
                      py-2
                    "
                  >
                    {link.label}
                  </Link>

                ))
              }

              {
                !loading && (

                  isGuide ? (

                    <Link
                      href="/guide-dashboard"

                      onClick={() =>
                        setMobileMenuOpen(false)
                      }

                      className="
                        text-[#F7E8C5]/80
                        hover:text-[#D4A43B]
                        transition
                        py-2
                      "
                    >
                      Guide Dashboard
                    </Link>

                  ) : (

                    <Link
                      href="/become-guide"

                      onClick={() =>
                        setMobileMenuOpen(false)
                      }

                      className="
                        text-[#F7E8C5]/80
                        hover:text-[#D4A43B]
                        transition
                        py-2
                      "
                    >
                      Become a Guide
                    </Link>

                  )

                )
              }

              <button
                onClick={logout}

                className="
                  mt-4
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-[#2a2112]
                  text-[#F7E8C5]/70
                  hover:text-[#D4A43B]
                  hover:border-[#D4A43B]/40
                  transition
                  text-left
                "
              >
                Sign Out
              </button>

            </div>

          )
        }

      </div>

    </div>

  );

}