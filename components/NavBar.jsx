"use client";

import Link from "next/link";

import {
  useState,
  useEffect
} from "react";

import {
  usePathname,
  useRouter
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function NavBar() {

  const router = useRouter();

  const pathname =
    usePathname();

  const [isGuide, setIsGuide] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    async function loadUser() {

      const {
        data: authData
      } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        setLoading(false);

        return;

      }

      setUser(authData.user);

      const { data } =
        await supabase
          .from("guides")
          .select("id")
          .eq(
            "user_id",
            authData.user.id
          )
          .single();

      if (data) {

        setIsGuide(true);

      }

      setLoading(false);

    }

    loadUser();

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

  function isActive(href) {

    return pathname === href;

  }

  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#2a2112]
        bg-[rgba(5,3,0,0.82)]
        backdrop-blur-2xl
      "
    >

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* TOP BAR */}

        <div
          className="
            h-[82px]
            flex
            items-center
            justify-between
            gap-6
          "
        >

          {/* LEFT */}

          <div className="flex items-center gap-10">

            {/* LOGO */}

            <Link
              href="/dashboard"

              className="
                flex
                items-center
                gap-4
                group
              "
            >

              <div
                className="
                  relative
                  w-12
                  h-12
                  md:w-14
                  md:h-14
                  rounded-[20px]
                  overflow-hidden
                  border
                  border-[#D4A43B]/20
                  bg-[#120d06]
                  shadow-[0_8px_40px_rgba(212,164,59,0.18)]
                "
              >

                <img
                  src="/logo.png"
                  alt="PipuPath"

                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

              <div>

                <div
                  className="
                    text-[#F7E8C5]
                    font-bold
                    text-xl
                    md:text-2xl
                    tracking-tight
                    group-hover:text-[#D4A43B]
                    transition
                  "
                >

                  PipuPath

                </div>

                <div
                  className="
                    text-[#D4A43B]
                    text-[10px]
                    md:text-xs
                    tracking-[0.35em]
                    uppercase
                  "
                >

                  Human OS

                </div>

              </div>

            </Link>

            {/* DESKTOP NAV */}

            <nav
              className="
                hidden
                xl:flex
                items-center
                gap-2
              "
            >

              {
                navLinks.map((link) => {

                  const active =
                    isActive(
                      link.href
                    );

                  return (

                    <Link
                      key={link.href}

                      href={link.href}

                      className={`
                        px-5
                        py-3
                        rounded-2xl
                        text-sm
                        font-medium
                        transition

                        ${
                          active

                            ? "bg-[#D4A43B] text-black"

                            : "text-[#F7E8C5]/70 hover:text-[#D4A43B] hover:bg-white/[0.03]"
                        }
                      `}
                    >

                      {link.label}

                    </Link>

                  );

                })
              }

              {
                !loading && (

                  isGuide ? (

                    <Link
                      href="/guide-dashboard"

                      className={`
                        px-5
                        py-3
                        rounded-2xl
                        text-sm
                        font-medium
                        transition

                        ${
                          pathname === "/guide-dashboard"

                            ? "bg-[#D4A43B] text-black"

                            : "text-[#F7E8C5]/70 hover:text-[#D4A43B] hover:bg-white/[0.03]"
                        }
                      `}
                    >

                      Guide Dashboard

                    </Link>

                  ) : (

                    <Link
                      href="/become-guide"

                      className={`
                        px-5
                        py-3
                        rounded-2xl
                        text-sm
                        font-medium
                        transition

                        ${
                          pathname === "/become-guide"

                            ? "bg-[#D4A43B] text-black"

                            : "text-[#F7E8C5]/70 hover:text-[#D4A43B] hover:bg-white/[0.03]"
                        }
                      `}
                    >

                      Become Guide

                    </Link>

                  )

                )
              }

            </nav>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-4">

            {/* USER */}

            {
              user && (

                <div
                  className="
                    hidden
                    lg:flex
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-2xl
                    border
                    border-[#2a2112]
                    bg-white/[0.03]
                  "
                >

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-[#D4A43B]
                      text-black
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                  >

                    {
                      user.email?.[0]
                        ?.toUpperCase()
                    }

                  </div>

                  <div>

                    <div
                      className="
                        text-[#F7E8C5]
                        text-sm
                        font-medium
                      "
                    >

                      {
                        isGuide
                          ? "Guide Account"
                          : "Explorer Account"
                      }

                    </div>

                    <div
                      className="
                        text-[#F7E8C5]/45
                        text-xs
                        max-w-[180px]
                        truncate
                      "
                    >

                      {user.email}

                    </div>

                  </div>

                </div>

              )
            }

            {/* LOGOUT */}

            <button
              onClick={logout}

              className="
                hidden
                md:flex
                px-5
                py-3
                rounded-2xl
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

            {/* MOBILE BUTTON */}

            <button
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }

              className="
                xl:hidden
                w-12
                h-12
                rounded-2xl
                border
                border-[#2a2112]
                flex
                items-center
                justify-center
                text-2xl
                text-[#F7E8C5]
              "
            >

              {
                mobileOpen
                  ? "×"
                  : "☰"
              }

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {
          mobileOpen && (

            <div
              className="
                xl:hidden
                pb-6
                animate-in
                fade-in
              "
            >

              <div
                className="
                  rounded-[32px]
                  border
                  border-[#2a2112]
                  bg-[#120d06]
                  p-4
                  space-y-2
                "
              >

                {
                  navLinks.map(
                    (link) => {

                      const active =
                        isActive(
                          link.href
                        );

                      return (

                        <Link
                          key={link.href}

                          href={link.href}

                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }

                          className={`
                            block
                            px-5
                            py-4
                            rounded-2xl
                            transition

                            ${
                              active

                                ? "bg-[#D4A43B] text-black font-bold"

                                : "text-[#F7E8C5]/75 hover:bg-white/[0.03]"
                            }
                          `}
                        >

                          {link.label}

                        </Link>

                      );

                    }
                  )
                }

                {
                  !loading && (

                    isGuide ? (

                      <Link
                        href="/guide-dashboard"

                        onClick={() =>
                          setMobileOpen(
                            false
                          )
                        }

                        className={`
                          block
                          px-5
                          py-4
                          rounded-2xl
                          transition

                          ${
                            pathname === "/guide-dashboard"

                              ? "bg-[#D4A43B] text-black font-bold"

                              : "text-[#F7E8C5]/75 hover:bg-white/[0.03]"
                          }
                        `}
                      >

                        Guide Dashboard

                      </Link>

                    ) : (

                      <Link
                        href="/become-guide"

                        onClick={() =>
                          setMobileOpen(
                            false
                          )
                        }

                        className={`
                          block
                          px-5
                          py-4
                          rounded-2xl
                          transition

                          ${
                            pathname === "/become-guide"

                              ? "bg-[#D4A43B] text-black font-bold"

                              : "text-[#F7E8C5]/75 hover:bg-white/[0.03]"
                          }
                        `}
                      >

                        Become Guide

                      </Link>

                    )

                  )
                }

                {/* MOBILE USER */}

                {
                  user && (

                    <div
                      className="
                        mt-5
                        rounded-2xl
                        border
                        border-[#2a2112]
                        bg-black/20
                        p-5
                      "
                    >

                      <div className="text-[#D4A43B] text-sm mb-2">

                        Logged In As

                      </div>

                      <div className="text-[#F7E8C5] font-medium break-all">

                        {user.email}

                      </div>

                    </div>

                  )
                }

                {/* LOGOUT */}

                <button
                  onClick={logout}

                  className="
                    w-full
                    mt-5
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-[#2a2112]
                    text-left
                    text-[#F7E8C5]/75
                    hover:text-[#D4A43B]
                    hover:border-[#D4A43B]/40
                    transition
                  "
                >

                  Sign Out

                </button>

              </div>

            </div>

          )
        }

      </div>

    </header>

  );

}