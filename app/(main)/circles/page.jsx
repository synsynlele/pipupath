"use client";

import {
  useEffect,
  useState,
} from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import GlowButton
from "@/components/ui/GlowButton";

import FloatingInput
from "@/components/ui/FloatingInput";

import { supabase }
from "@/lib/supabase";

import {
  logEvent
} from "@/lib/logEvent";

export default function CirclesPage() {

  const [circles, setCircles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const [name, setName] =
    useState("");

  const [focus, setFocus] =
    useState("");

  const [
    weeklyGoal,
    setWeeklyGoal,
  ] = useState("");

  const [
    whatsappLink,
    setWhatsappLink,
  ] = useState("");

  async function loadCircles() {

    const {
      data,
      error,
    } =
      await supabase
        .from(
          "accountability_circles"
        )
        .select(`
          *,
          accountability_circle_members(count)
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {

      console.error(error);

    } else {

      setCircles(data);
    }

    setLoading(false);
  }

  useEffect(() => {

    loadCircles();

  }, []);

  async function handleCreateCircle() {

    if (
      !name ||
      !focus
    ) {

      alert(
        "Circle name and focus are required."
      );

      return;
    }

    setCreating(true);

    try {

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData?.user;

      if (!user) return;

      const {
        error,
      } =
        await supabase
          .from(
            "accountability_circles"
          )
          .insert({

            name,

            focus,

            weekly_goal:
              weeklyGoal,

            whatsapp_link:
              whatsappLink,

            created_by:
              user.id,
          });

      if (error) {

        console.error(error);

        alert(
          "Failed to create circle."
        );

      } else {

        setName("");
        setFocus("");
        setWeeklyGoal("");
        setWhatsappLink("");

        loadCircles();

        alert(
          "Circle created successfully."
        );
      }

    } catch (error) {

      console.error(error);

    } finally {

      setCreating(false);
    }
  }

  async function joinCircle(
    circleId
  ) {

    try {

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData?.user;

      if (!user) return;

      const {
        error,
      } =
        await supabase
          .from(
            "accountability_circle_members"
          )
          .insert({

            circle_id:
              circleId,

            user_id:
              user.id,
          });
if (error) {

  console.error(error);

  alert(
    "Failed to join circle."
  );

} else {

  await logEvent({

    userId:
      user.id,

    type:
      "circle_joined",

    title:
      "Joined accountability circle",

    metadata: {

      circleId:
        circleId,
    },
  });

  alert(
    "You joined the circle."
  );

  loadCircles();
}

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <BuilderShell
      title="Circles"
      subtitle="Shared Momentum"
    >

      <div className="flex flex-col gap-6 pb-32">

        {/* HERO */}

        <BuilderCard>

          <h1 className="text-4xl font-bold text-white">

            Accountability Circles

          </h1>

          <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">

            Build consistency with focused builders pursuing goals together.

          </p>

        </BuilderCard>

        {/* CREATE */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Create Circle

          </h2>

          <div className="mt-6 flex flex-col gap-5">

            <FloatingInput
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Circle Name"
            />

            <FloatingInput
              value={focus}
              onChange={(e) =>
                setFocus(e.target.value)
              }
              placeholder="Circle Focus"
            />

            <FloatingInput
              value={weeklyGoal}
              onChange={(e) =>
                setWeeklyGoal(
                  e.target.value
                )
              }
              placeholder="Weekly Goal"
            />

            <FloatingInput
              value={whatsappLink}
              onChange={(e) =>
                setWhatsappLink(
                  e.target.value
                )
              }
              placeholder="WhatsApp Group Link"
            />

            <GlowButton
              onClick={
                handleCreateCircle
              }

              disabled={creating}
            >

              {
                creating
                  ? "Creating Circle..."
                  : "Create Circle"
              }

            </GlowButton>

          </div>

        </BuilderCard>

        {/* LIST */}

        <div className="grid gap-5 md:grid-cols-2">

          {loading ? (

            <BuilderCard>

              <p className="text-slate-400">

                Loading circles...

              </p>

            </BuilderCard>

          ) : circles.length === 0 ? (

            <BuilderCard>

              <p className="text-slate-400">

                No circles yet.

              </p>

            </BuilderCard>

          ) : (

            circles.map(
              (circle) => (

                <BuilderCard
                  key={circle.id}
                >

                  <div className="mb-3 w-fit rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">

                    ACCOUNTABILITY CIRCLE

                  </div>

                  <h2 className="text-2xl font-semibold text-white">

                    {circle.name}

                  </h2>

                  <p className="mt-4 text-slate-400">

                    {circle.focus}

                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">

                    <p className="text-xs uppercase tracking-wide text-slate-500">

                      Weekly Goal

                    </p>

                    <p className="mt-2 text-slate-300">

                      {
                        circle.weekly_goal ||
                        "Stay consistent and execute."
                      }

                    </p>

                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <p className="text-sm text-slate-400">

                      Members:
                      {" "}
                      {
                        circle
                          .accountability_circle_members?.[0]
                          ?.count || 0
                      }

                    </p>

                    <GlowButton
                      onClick={() =>
                        joinCircle(
                          circle.id
                        )
                      }
                    >

                      Join Circle

                    </GlowButton>

                  </div>

                  {circle.whatsapp_link && (

                    <a
                      href={
                        circle.whatsapp_link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-5
                        block
                        rounded-2xl
                        border
                        border-green-400/20
                        bg-green-500/10
                        px-5
                        py-4
                        text-center
                        font-semibold
                        text-green-300
                        transition-all
                        hover:bg-green-500/20
                      "
                    >

                      Open WhatsApp Group

                    </a>

                  )}

                </BuilderCard>

              )
            )

          )}

        </div>

      </div>

    </BuilderShell>
  );
}