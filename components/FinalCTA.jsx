import Link from "next/link";

export default function FinalCTA() {

  return (

    <section className="px-6 py-28 md:px-10">

      <div className="max-w-6xl mx-auto">

        <div className="
        rounded-[48px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-10 md:p-16
        shadow-[0_10px_60px_rgba(0,0,0,0.25)]
        text-center
        ">

          {/* LABEL */}

          <div className="inline-flex items-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-5 py-2">

            <span className="text-sm font-medium text-[#FACC15]">

              🌍 Build Something Meaningful

            </span>

          </div>

          {/* HEADING */}

          <h2 className="mt-8 text-4xl md:text-7xl font-semibold leading-tight text-white">

            The world needs more
            <span className="block">

              builders.

            </span>

          </h2>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#CBD5E1]">

            PipuPath helps young people discover who they are, build real-world skills and grow into builders of the future — one quest at a time.

          </p>

          {/* BUTTONS */}

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

            <Link

              href="/signup"

              className="
              rounded-2xl
              bg-[#0F172A]
              border
              border-white/10
              px-8
              py-4
              font-medium
              text-white
              shadow-[0_10px_40px_rgba(0,0,0,0.25)]
              transition-all
              hover:translate-y-[-2px]
              "

            >

              ⚡ Begin Your Journey

            </Link>

            <Link

              href="/login"

              className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-8
              py-4
              font-medium
              text-[#CBD5E1]
              transition-all
              hover:bg-white/10
              "

            >

              🧭 Continue Journey

            </Link>

          </div>

          {/* FOOT NOTE */}

          <p className="mt-14 text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">

            Your future is not built in one day.

            It is built through small actions, repeated over time.

          </p>

        </div>

      </div>

    </section>

  );

}