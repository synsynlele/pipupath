"use client";

import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";

import MagneticButton from "./MagneticButton";

import AnimatedCounter from "./AnimatedCounter";

import {
  Brain,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";

const floatingCards = [
  {
    icon: Brain,
    title: "Identity Engine",
    text: "Discover how you naturally win."
  },
  {
    icon: Target,
    title: "Mission System",
    text: "Turn goals into execution loops."
  },
  {
    icon: TrendingUp,
    title: "Momentum Tracking",
    text: "Measure growth over time."
  },
  {
    icon: Shield,
    title: "Recovery Intelligence",
    text: "Detect collapse before burnout."
  }
];

export default function Hero() {

  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 120]);

  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  return (

    <section className="relative overflow-hidden min-h-screen bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-[#7C3AED]/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-140px] right-[-120px] w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-[#D4A43B]/10 blur-3xl rounded-full" />

      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-6 pt-28 md:pt-8">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[88vh]">

          {/* LEFT */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            {/* BADGE */}
            <div
              className="
              inline-flex
              items-center
              gap-2
              border
              border-white/10
              bg-white/5
              backdrop-blur-md
              rounded-full
              px-4
              py-2
              mb-8
              "
            >

              <Sparkles
                size={15}
                className="text-[#D4A43B]"
              />

              <span className="text-xs md:text-sm text-white/80">

                PipuPath • HumanOS Infrastructure

              </span>

            </div>

            {/* HEADLINE */}
            <h1
              className="
              text-[3rem]
              sm:text-[4rem]
              md:text-7xl
              font-extrabold
              leading-[0.95]
              tracking-tight
              "
            >

              The Operating
              <br />

              System For
              <br />

              <span className="text-[#D4A43B]">

                Human Potential.

              </span>

            </h1>

            {/* SUBTEXT */}
            <p
              className="
              mt-7
              text-base
              sm:text-lg
              md:text-xl
              leading-relaxed
              text-white/70
              max-w-xl
              "
            >

              PipuPath helps ambitious humans discover their edge,
              execute missions, recover momentum,
              and compound growth through adaptive intelligence systems.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

             <MagneticButton
  onClick={() => window.dispatchEvent(new Event("openIdentityModal"))}
  className="
                group
                w-full
                sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-4
                rounded-2xl
                bg-[#D4A43B]
                text-black
                font-semibold
                shadow-[0_0_40px_rgba(212,164,59,0.25)]
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

              </MagneticButton>

              <MagneticButton
                className="
                w-full
                sm:w-auto
                px-7
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                text-white
                font-semibold
                hover:bg-white/10
                transition-all
                duration-300
                "
              >

                Explore Platform

              </MagneticButton>

            </div>

            {/* SOCIAL */}
            <div
              className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-4
              sm:gap-6
              text-xs
              sm:text-sm
              text-white/50
              "
            >

              <span>Students</span>

              <span>Founders</span>

              <span>Professionals</span>

              <span>Schools</span>

              <span>Creators</span>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* MAIN PANEL */}
            <motion.div
              whileHover={{
                y: -6,
                rotateX: 2,
                rotateY: -2
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18
              }}
              className="
              relative
              rounded-[28px]
              md:rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-5
              sm:p-6
              md:p-8
              overflow-hidden
              "
            >

              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">

                <div>

                  <div className="text-xs sm:text-sm text-white/50">

                    PIPUPATH CORE

                  </div>

                  <div className="text-xl sm:text-2xl font-bold mt-1">

                    Behavioral Infrastructure

                  </div>

                </div>

                {/* ACTIVE SIGNAL */}
                <div className="relative flex items-center justify-center">

                  <span
                    className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    rounded-full
                    bg-green-400
                    opacity-75
                    animate-ping
                    "
                  />

                  <span
                    className="
                    relative
                    inline-flex
                    rounded-full
                    h-3
                    w-3
                    bg-green-400
                    "
                  />

                </div>

              </div>

              {/* SYSTEM FLOW */}
              <div className="space-y-4">

                {floatingCards.map((card, i) => {

                  const Icon = card.icon;

                  return (

                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.5
                      }}
                      className="
                      flex
                      hover:-translate-y-1
                      items-start
                      gap-4
                      p-4
                      sm:p-5
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                      hover:bg-black/30
                      transition-all
                      duration-300
                      "
                    >

                      {/* ICON */}
                      <div
                        className="
                        w-11
                        h-11
                        sm:w-12
                        sm:h-12
                        rounded-xl
                        bg-[#D4A43B]/10
                        flex
                        items-center
                        justify-center
                        shrink-0
                        "
                      >

                        <Icon
                          size={20}
                          className="text-[#D4A43B]"
                        />

                      </div>

                      {/* CONTENT */}
                      <div>

                        <div className="font-semibold text-base sm:text-lg">

                          {card.title}

                        </div>

                        <div
                          className="
                          text-white/60
                          mt-1
                          text-sm
                          leading-relaxed
                          "
                        >

                          {card.text}

                        </div>

                      </div>

                    </motion.div>

                  );

                })}

              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">

                {/* MOMENTUM */}
                <div
                  className="
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  p-3
                  sm:p-4
                  "
                >

                  <div className="text-white/40 text-[10px] sm:text-xs">

                    Momentum

                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-2xl font-bold mt-2"
                  >

                    <AnimatedCounter
                      from={0}
                      to={87}
                      duration={2}
                      suffix="%"
                    />

                  </motion.div>

                </div>

                {/* MISSIONS */}
                <div
                  className="
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  p-3
                  sm:p-4
                  "
                >

                  <div className="text-white/40 text-[10px] sm:text-xs">

                    Missions

                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-2xl font-bold mt-2"
                  >

                    <AnimatedCounter
                      from={0}
                      to={142}
                      duration={2.4}
                      suffix="K"
                    />

                  </motion.div>

                </div>

                {/* XP */}
                <div
                  className="
                  rounded-2xl
                  bg-black/30
                  border
                  border-white/10
                  p-3
                  sm:p-4
                  "
                >

                  <div className="text-white/40 text-[10px] sm:text-xs">

                    Growth XP

                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-2xl font-bold mt-2"
                  >

                    <>
                      <AnimatedCounter
                        from={0}
                        to={9}
                        duration={2.5}
                      />
                      .4M
                    </>

                  </motion.div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>

  );

}