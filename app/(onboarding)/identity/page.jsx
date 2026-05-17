"use client";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

import BuilderCard from "@/components/ui/BuilderCard";

import GlowButton from "@/components/ui/GlowButton";

import useProfileStore from "@/stores/profileStore";

import BuilderShell from "@/components/layout/BuilderShell";

import useOnboardingStore from "@/stores/onboardingStore";

import { generateBuilderProfile }
from "@/services/builderProfile";

export default function IdentityPage() {

  const { answers } =
    useOnboardingStore();

const { completeOnboarding } =
  useProfileStore();

const router =
  useRouter();

  const profile =
    generateBuilderProfile(
      answers
    );

  return (

    <BuilderShell
  title="PipuPath"
  subtitle="Builder Identity"
>

      <div className="flex flex-col">

        {/* LABEL */}

        <div className="mb-6 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          Builder Identity
        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

          You are a
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            {" "}{profile.identity}
          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="mt-6 text-lg leading-relaxed text-slate-400">

          Your answers show strong potential
          for building valuable skills and
          creating meaningful opportunities.

        </p>

        {/* STRENGTHS */}

        <BuilderCard className="mt-10">

          <h3 className="text-lg font-semibold text-white">

            Your Natural Strengths

          </h3>

          <div className="mt-5 flex flex-wrap gap-3">

            {profile.strengths.map((item) => (

              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </div>

            ))}

          </div>

        </BuilderCard>

        {/* SKILLS */}

        <BuilderCard className="mt-5">

          <h3 className="text-lg font-semibold text-white">

            Skills You Should Develop

          </h3>

          <div className="mt-5 flex flex-wrap gap-3">

            {profile.skills.map((item) => (

              <div
                key={item}
                className="rounded-full border border-blue-400/10 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
              >
                {item}
              </div>

            ))}

          </div>

        </BuilderCard>

        {/* FIRST MISSION */}

        <BuilderCard className="mt-5">

          <h3 className="text-lg font-semibold text-white">

            Your First Mission

          </h3>

          <p className="mt-4 text-slate-400">

            {profile.mission}

          </p>

        </BuilderCard>

        {/* EARNING PATH */}

        <BuilderCard className="mt-5">

          <h3 className="text-lg font-semibold text-white">

            Possible First Income Path

          </h3>

          <p className="mt-4 text-slate-400">

            {profile.earningPath}

          </p>

        </BuilderCard>

        {/* CTA */}

        <div className="mt-8">

         <GlowButton
  onClick={async () => {

    completeOnboarding(profile);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (user) {

      const {
        error,
      } =
        await supabase
          .from("profiles")
          .upsert({

            id: user.id,

            onboarding_completed: true,

            onboarding_completed_at:
              new Date(),

            builder_identity:
              profile.identity,

            strengths:
              profile.strengths,

            skills:
              profile.skills,

            earning_path:
              profile.earningPath,

            updated_at:
              new Date(),
          });

      if (error) {

        console.error(error);
      }
    }

    router.push("/journey");
  }}
>

  Start Building

</GlowButton>

        </div>

      </div>

    </BuilderShell>
  );
}