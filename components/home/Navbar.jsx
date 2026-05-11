"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import PipuPathLogo from "@/components/brand/PipuPathLogo";

import {
  Menu,
  X,
  ArrowRight
} from "lucide-react";

const navLinks = [
  {
    label: "Systems",
    href: "#systems"
  },

  {
    label: "Progression",
    href: "#progression"
  },

  {
    label: "Schools",
    href: "#schools"
  },

  {
    label: "About",
    href: "#about"
  }
];

export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {

    function handleScroll() {

      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link =>
        document.querySelector(link.href)
      );

      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {

        if (!section) continue;

        const top = section.offsetTop;

        const height = section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {

          setActiveSection(`#${section.id}`);

        }

      }

    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  function scrollToSection(id) {

    if(id === "top") {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      setMobileOpen(false);

      return;
    }

    const el = document.querySelector(id);

    if(el){

      el.scrollIntoView({
        behavior: "smooth"
      });

    }

    setMobileOpen(false);

  }

  return (

    <>

      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-500

        ${
          scrolled
          ? "bg-[#050816]/75 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
        }
        `}
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-5
          md:px-6
          h-20
          flex
          items-center
          justify-between
          "
        >

          <button
            onClick={() => scrollToSection("top")}
            className="shrink-0"
          >

            <PipuPathLogo size="sm" />

          </button>

          <div className="hidden lg:flex items-center gap-3">

            {navLinks.map((item, i) => {

              const active = activeSection === item.href;

              return (

                <button
                  key={i}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                  relative
                  px-4
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${
                    active
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }
                  `}
                >

                  {item.label}

                  {active && (

                    <motion.div
                      layoutId="active-pill"
                      className="
                      absolute
                      inset-0
                      rounded-xl
                      border
                      border-white/10
                      "
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />

                  )}

                </button>

              );

            })}

          </div>

          <div className="flex items-center gap-3">

            <button
              className="
              hidden
              md:flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              text-white
              hover:bg-white/10
              transition-all
              duration-300
              "
            >

              Login

            </button>

            <motion.button
              onClick={() => window.dispatchEvent(new Event("openIdentityModal"))}
              whileHover={{
                scale: 1.03,
                y: -1
              }}
              whileTap={{
                scale: 0.98
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18
              }}
              className="
              hidden
              sm:flex
              group
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-[#D4A43B]
              text-black
              font-semibold
              shadow-[0_0_30px_rgba(212,164,59,0.25)]
              "
            >

              {
                activeSection === "#schools"
                ? "Book School Demo"
                : activeSection === "#progression"
                ? "Start Progression"
                : "Start Human Audit"
              }

              <ArrowRight
                size={16}
                className="
                group-hover:translate-x-1
                transition-all
                duration-300
                "
              />

            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="
              lg:hidden
              w-11
              h-11
              rounded-xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              flex
              items-center
              justify-center
              "
            >

              <Menu size={20} />

            </button>

          </div>

        </div>

      </motion.header>

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
            fixed
            inset-0
            z-[100]
            bg-black/70
            backdrop-blur-xl
            "
          >

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 220
              }}
              className="
              absolute
              top-0
              right-0
              h-full
              w-[85%]
              max-w-[420px]
              bg-[#070B1A]
              border-l
              border-white/10
              p-8
              flex
              flex-col
              "
            >

              <div className="flex items-center justify-between gap-4">

                <PipuPathLogo size="sm" />

                <button
                  onClick={() => setMobileOpen(false)}
                  className="
                  w-11
                  h-11
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  shrink-0
                  "
                >

                  <X size={20} />

                </button>

              </div>

              <div className="mt-16 flex flex-col gap-4">

                {navLinks.map((item, i) => {

                  const active = activeSection === item.href;

                  return (

                    <button
                      key={i}
                      onClick={() => scrollToSection(item.href)}
                      className={`
                      text-left
                      text-xl
                      font-bold
                      py-4
                      px-4
                      rounded-2xl
                      transition-all
                      duration-300

                      ${
                        active
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/70 hover:bg-white/[0.04]"
                      }
                      `}
                    >

                      {item.label}

                    </button>

                  );

                })}

              </div>

              <div className="mt-auto">

                <motion.button
                  onClick={() => window.dispatchEvent(new Event("openIdentityModal"))}
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className="
                  w-full
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  px-6
                  py-5
                  rounded-2xl
                  bg-[#D4A43B]
                  text-black
                  font-bold
                  text-lg
                  "
                >

                  Start Human Audit

                  <ArrowRight
                    size={18}
                    className="
                    group-hover:translate-x-1
                    transition-all
                    duration-300
                    "
                  />

                </motion.button>

                <button
                  className="
                  w-full
                  mt-4
                  px-6
                  py-5
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  text-white
                  font-semibold
                  hover:bg-white/10
                  transition-all
                  duration-300
                  "
                >

                  Login

                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

}