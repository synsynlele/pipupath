"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import OnboardingLayout from "@/features/onboarding/components/OnboardingLayout";

const messages = [
"Discovering your strengths...",
"Mapping practical opportunities...",
"Building your first direction...",
];

export default function AnalyzingPage() {

const router = useRouter();

const [index, setIndex] = useState(0);

useEffect(() => {

const interval = setInterval(() => {

  setIndex((prev) =>
    (prev + 1) % messages.length
  );

}, 1800);

const timeout = setTimeout(() => {

  router.push("/identity");

}, 5000);

return () => {

  clearInterval(interval);

  clearTimeout(timeout);
};


}, [router]);

return (


<OnboardingLayout>

  <div className="flex flex-col items-center text-center">

    {/* ORB */}

    <motion.div
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 blur-2xl"
    />

    {/* TEXT */}

    <motion.p
      key={messages[index]}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-14 text-xl text-slate-300"
    >
      {messages[index]}
    </motion.p>

  </div>

</OnboardingLayout>


);
}
