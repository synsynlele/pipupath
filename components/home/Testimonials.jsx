"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "For the first time, I stopped consuming random motivation and started operating with structure. PipuPath helped me understand how I naturally work and build momentum consistently.",

    name: "David A.",
    role: "Founder & Product Builder"
  },

  {
    quote:
      "MagicPen exposed preparation gaps I didn’t even realize existed. Instead of studying blindly, I finally had a clear execution system that improved my confidence and performance.",

    name: "Sarah K.",
    role: "University Student"
  },

  {
    quote:
      "The mission system changed how our students approach growth. We started seeing stronger accountability, consistency, leadership, and ownership behaviors.",

    name: "Michael T.",
    role: "School Administrator"
  },

  {
    quote:
      "Nortnspoil is one of the smartest recovery systems I’ve seen. Most platforms ignore users when momentum drops. PipuPath detects collapse early and helps recover trajectory.",

    name: "Daniel O.",
    role: "Behavioral Coach"
  },

  {
    quote:
      "PipuPath feels less like an app and more like an adaptive operating system that evolves with you over time. The progression system makes growth visible and addictive.",

    name: "Grace N.",
    role: "Creative Entrepreneur"
  },

  {
    quote:
      "What impressed me most is how PipuPath connects identity, execution, recovery, and long-term growth into one ecosystem. That level of integration is rare.",

    name: "Joshua E.",
    role: "Education Consultant"
  }
];

export default function Testimonials() {

  return (

    <section
      className="
      relative
      py-24
      md:py-32
      bg-[#050816]
      text-white
      overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-[10%] left-[-120px] w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-[#7C3AED]/10 blur-3xl rounded-full" />

        <div className="absolute bottom-[10%] right-[-120px] w-[320px] md:w-[500px] h-[320px] md:h-[500px] bg-[#D4A43B]/10 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >

          <div
            className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-white/5
            text-white/70
            text-xs
            sm:text-sm
            mb-6
            "
          >

            PipuPath Transformations

          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            leading-[1.05]
            tracking-tight
            "
          >

            Growth Changes
            <br />

            When Humans
            <span className="text-[#D4A43B]">
              {" "}Feel Seen.
            </span>

          </h2>

          <p
            className="
            mt-7
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
            text-white/65
            max-w-2xl
            "
          >

            PipuPath combines behavioral intelligence,
            execution systems, and adaptive infrastructure
            to create measurable human transformation over time.

          </p>

        </motion.div>

        {/* GRID */}
        <div
          className="
          mt-16
          md:mt-20
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          md:gap-8
          "
        >

          {testimonials.map((item, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08
              }}
              viewport={{ once: true }}
              className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              md:rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-5
              sm:p-6
              md:p-8
              hover:border-[#D4A43B]/30
              transition-all
              duration-500
              "
            >

              {/* GLOW */}
              <div
                className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-500
                bg-gradient-to-br
                from-[#D4A43B]/5
                via-transparent
                to-[#7C3AED]/5
                "
              />

              {/* QUOTE */}
              <div className="relative z-10">

                <div
                  className="
                  text-5xl
                  md:text-6xl
                  leading-none
                  font-black
                  text-[#D4A43B]/30
                  "
                >
                  "
                </div>

                <p
                  className="
                  mt-4
                  text-base
                  md:text-lg
                  leading-relaxed
                  text-white/75
                  "
                >

                  {item.quote}

                </p>

              </div>

              {/* FOOTER */}
              <div
                className="
                relative
                z-10
                mt-8
                md:mt-10
                pt-5
                md:pt-6
                border-t
                border-white/10
                "
              >

                <div className="font-bold text-base md:text-lg">

                  {item.name}

                </div>

                <div className="mt-1 text-sm md:text-base text-white/45">

                  {item.role}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

        {/* BOTTOM TRUST PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
          mt-20
          md:mt-28
          rounded-[30px]
          md:rounded-[40px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.05]
          to-white/[0.02]
          backdrop-blur-xl
          p-6
          sm:p-8
          md:p-16
          "
        >

          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* LEFT */}
            <div>

              <div
                className="
                text-[11px]
                sm:text-sm
                uppercase
                tracking-[0.3em]
                text-white/40
                mb-5
                md:mb-6
                "
              >

                PipuPath Vision

              </div>

              <h3
                className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-black
                leading-tight
                "
              >

                The future belongs
                to systems that help
                humans evolve.

              </h3>

            </div>

            {/* RIGHT */}
            <div
              className="
              space-y-5
              md:space-y-6
              text-base
              md:text-lg
              text-white/70
              leading-relaxed
              "
            >

              <p>

                PipuPath is not trying to optimize productivity alone.

                It is building adaptive infrastructure for:
                identity clarity, behavioral intelligence,
                execution consistency, and long-term human growth.

              </p>

              <p>

                The mission is larger than software.

                It is about helping humans compound into
                stronger thinkers, builders, leaders, and creators.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}