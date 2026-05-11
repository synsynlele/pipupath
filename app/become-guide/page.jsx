"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import NavBar from "@/components/NavBar";

export default function BecomeGuidePage() {

  const router = useRouter();

  const [checkingGuide, setCheckingGuide] =
    useState(true);

  const [fullName, setFullName] =
    useState("");

  const [headline, setHeadline] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [expertise, setExpertise] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function checkExistingGuide() {

      const { data: authData } =
        await supabase.auth.getUser();

      if (!authData?.user) {

        router.push("/");

        return;

      }

      const { data: guideData } =
        await supabase
          .from("guides")
          .select("id")
          .eq("user_id", authData.user.id)
          .single();

      if (guideData) {

        router.push("/guide-dashboard");

        return;

      }

      setCheckingGuide(false);

    }

    checkExistingGuide();

  }, [router]);

  async function createGuideProfile() {

    if (
      !fullName ||
      !headline ||
      !bio ||
      !expertise ||
      !price
    ) {

      alert("Please complete all fields");

      return;

    }

    setLoading(true);

    const { data: userData } =
      await supabase.auth.getUser();

    if (!userData?.user) {

      alert("Please login first");

      setLoading(false);

      return;

    }

    const { error } =
      await supabase
        .from("guides")
        .insert({

          user_id:
            userData.user.id,

          full_name:
            fullName,

          headline,

          bio,

          hourly_rate:
            Number(price),

          expertise:
            expertise
              .split(",")
              .map((item) =>
                item.trim()
              )

        });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    router.push("/guide-dashboard");

  }

  if (checkingGuide) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="text-center">

          <div className="text-3xl font-bold mb-4">
            Preparing Guide Access...
          </div>

          <div className="text-white/50">
            Checking onboarding status
          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#050300] to-[#0c0903] text-[#F7E8C5]">

      <NavBar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            items-start
          "
        >

          {/* LEFT SIDE */}

          <div>

            <div className="text-[#D4A43B] uppercase tracking-[0.35em] text-xs mb-6">

              Guide Onboarding

            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                leading-[1.02]
                mb-8
              "
            >

              Become
              <br />
              A Strategic
              <br />
              Guide

            </h1>

            <p
              className="
                text-[#F7E8C5]/70
                text-lg
                md:text-xl
                leading-relaxed
                max-w-2xl
                mb-10
              "
            >

              Build your mentorship identity, publish your expertise and begin guiding ambitious people through transformation and growth.

            </p>

            {/* FEATURES */}

            <div className="space-y-5">

              <div
                className="
                  rounded-3xl
                  border
                  border-[#2a2112]
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="text-[#D4A43B] font-bold text-lg mb-2">

                  Publish Expertise

                </div>

                <div className="text-[#F7E8C5]/60 leading-relaxed">

                  Create a premium public guide profile and position yourself strategically.

                </div>

              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-[#2a2112]
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="text-[#D4A43B] font-bold text-lg mb-2">

                  Mentor Through Sessions

                </div>

                <div className="text-[#F7E8C5]/60 leading-relaxed">

                  Manage availability, host live sessions and guide meaningful growth conversations.

                </div>

              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-[#2a2112]
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="text-[#D4A43B] font-bold text-lg mb-2">

                  Build Long-Term Influence

                </div>

                <div className="text-[#F7E8C5]/60 leading-relaxed">

                  Turn your knowledge into scalable trust, reputation and impact.

                </div>

              </div>

            </div>

          </div>

          {/* FORM */}

          <div
            className="
              rounded-[36px]
              border
              border-[#2a2112]
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
              md:p-8
            "
          >

            <div className="mb-8">

              <div className="text-3xl font-bold mb-3">

                Create Your Guide Profile

              </div>

              <div className="text-[#F7E8C5]/60 leading-relaxed">

                Fill out your professional guide identity and publish your mentorship presence.

              </div>

            </div>

            <div className="space-y-6">

              {/* FULL NAME */}

              <div>

                <label className="block text-[#D4A43B] text-sm mb-3">

                  Full Name

                </label>

                <input
                  value={fullName}

                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }

                  placeholder="Your full professional name"

                  className="
                    w-full
                    bg-black/40
                    border
                    border-[#2a2112]
                    rounded-2xl
                    p-5
                    outline-none
                    focus:border-[#D4A43B]/40
                    transition
                  "
                />

              </div>

              {/* HEADLINE */}

              <div>

                <label className="block text-[#D4A43B] text-sm mb-3">

                  Professional Headline

                </label>

                <input
                  value={headline}

                  onChange={(e) =>
                    setHeadline(
                      e.target.value
                    )
                  }

                  placeholder="Leadership Mentor, Startup Strategist..."

                  className="
                    w-full
                    bg-black/40
                    border
                    border-[#2a2112]
                    rounded-2xl
                    p-5
                    outline-none
                    focus:border-[#D4A43B]/40
                    transition
                  "
                />

              </div>

              {/* BIO */}

              <div>

                <label className="block text-[#D4A43B] text-sm mb-3">

                  Professional Bio

                </label>

                <textarea
                  value={bio}

                  onChange={(e) =>
                    setBio(
                      e.target.value
                    )
                  }

                  placeholder="Describe your experience, transformation philosophy and mentorship approach..."

                  className="
                    w-full
                    min-h-[180px]
                    bg-black/40
                    border
                    border-[#2a2112]
                    rounded-2xl
                    p-5
                    outline-none
                    resize-none
                    focus:border-[#D4A43B]/40
                    transition
                  "
                />

              </div>

              {/* EXPERTISE */}

              <div>

                <label className="block text-[#D4A43B] text-sm mb-3">

                  Expertise Areas

                </label>

                <input
                  value={expertise}

                  onChange={(e) =>
                    setExpertise(
                      e.target.value
                    )
                  }

                  placeholder="Leadership, Startups, Finance..."

                  className="
                    w-full
                    bg-black/40
                    border
                    border-[#2a2112]
                    rounded-2xl
                    p-5
                    outline-none
                    focus:border-[#D4A43B]/40
                    transition
                  "
                />

                <div className="mt-3 text-sm text-[#F7E8C5]/40">

                  Separate expertise with commas

                </div>

              </div>

              {/* PRICE */}

              <div>

                <label className="block text-[#D4A43B] text-sm mb-3">

                  Session Rate (₦)

                </label>

                <input
                  value={price}

                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }

                  placeholder="25000"

                  className="
                    w-full
                    bg-black/40
                    border
                    border-[#2a2112]
                    rounded-2xl
                    p-5
                    outline-none
                    focus:border-[#D4A43B]/40
                    transition
                  "
                />

              </div>

              {/* SUBMIT */}

              <button
                onClick={createGuideProfile}

                disabled={loading}

                className="
                  w-full
                  bg-[#D4A43B]
                  hover:bg-[#e5b84b]
                  text-black
                  font-bold
                  py-5
                  rounded-2xl
                  transition
                  mt-4
                "
              >

                {
                  loading

                    ? "Creating Profile..."

                    : "Create Guide Profile"
                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}