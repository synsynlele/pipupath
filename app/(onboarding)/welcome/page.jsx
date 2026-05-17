"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import GlowButton from "@/components/ui/GlowButton";

import OnboardingLayout from "@/features/onboarding/components/OnboardingLayout";

export default function WelcomePage() {

const router = useRouter();

return (

<OnboardingLayout>

  <div className="flex flex-col items-center text-center">

    {/* LABEL */}

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl"
    >
      Builder Discovery
    </motion.div>

    {/* TITLE */}

    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white"
    >
      The world needs
      <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
        {" "}more builders.
      </span>
    </motion.h1>

    {/* SUBTEXT */}

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
    >
      Let’s discover your strengths,
      uncover practical opportunities,
      and begin building your future.
    </motion.p>

    {/* BUTTON */}

    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-12 w-full max-w-sm"
    >

      <GlowButton
        onClick={() => router.push("/questions/1")}
      >
        Begin Journey
      </GlowButton>

    </motion.div>

  </div>

</OnboardingLayout>


);
}
