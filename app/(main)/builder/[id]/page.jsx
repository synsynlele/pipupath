

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import { supabase }
from "@/lib/supabase";

import {
  matchBuilders
} from "@/lib/matchBuilders";

import Link from "next/link";

import { useAuth }
from "@/context/AuthContext";

import useProfileStore
from "@/stores/profileStore";

export default function BuilderProfilePage() {

  const params =
    useParams();

  const [builder, setBuilder] =
    useState(null);

const [
  suggestedBuilders,
  setSuggestedBuilders,
] = useState([]);

  const [loading, setLoading] =
    useState(true);

const { user } = useAuth();

const {
  builderProfile:userProfile,
} = useProfileStore();

const [
  sendingRequest,
  setSendingRequest,
] = useState(false);



const connectionMessage =
  encodeURIComponent(

`Hi, I found your builder profile on PipuPath.

I would love to connect and potentially collaborate with you on builder projects and growth opportunities.`
);

  useEffect(() => {

    async function loadBuilder() {

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "id",
            params.id
          )
          .single();

      if (error) {

        console.error(error);

      } else {

        setBuilder(data);
      }

const {
  data: allBuilders,
} =
  await supabase
    .from("profiles")
    .select("*")
    .eq(
      "public_visibility",
      true
    );

const matches =
  matchBuilders(
    data,
    (allBuilders || []).filter(
      item =>
        item.id !== data.id
    )
  );

setSuggestedBuilders(
  matches
);

      setLoading(false);
    }

    if (params?.id) {

      loadBuilder();
    }

  }, [params]);

async function sendConnectionRequest() {

  if (!user) {

    alert(
      "Please sign in first."
    );

    return;
  }

  if (
    user.id === builder.id
  ) {

    alert(
      "You cannot connect with yourself."
    );

    return;
  }

  try {

    setSendingRequest(true);

    const { error } =
      await supabase
        .from(
          "connection_requests"
        )
        .insert({

          sender_id:
            user.id,

          receiver_id:
            builder.id,

          sender_name:
  userProfile?.displayName ||
  user.email,

receiver_name:
  builder.display_name ||
  "Builder",

          message:
            "Builder connection request",

          status:
            "pending",

        });

    if (error)
      throw error;

    alert(
      "Connection request sent."
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to send request."
    );

  } finally {

    setSendingRequest(false);
  }
}


  if (loading) {


    return (

      <BuilderShell
        title="Builder Profile"
        subtitle="Loading..."
      >

        <BuilderCard>

          <p className="text-slate-400">

            Loading builder profile...

          </p>

        </BuilderCard>

      </BuilderShell>
    );
  }

  if (!builder) {

    return (

      <BuilderShell
        title="Builder Profile"
        subtitle="Not Found"
      >

        <BuilderCard>

          <p className="text-slate-400">

            Builder not found.

          </p>

        </BuilderCard>

      </BuilderShell>
    );
  }

  return (

    <BuilderShell
      title="Builder Profile"
      subtitle="Builder Identity"
    >

      <div className="flex flex-col gap-5">

        {/* HERO */}

        <BuilderCard>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                BUILDER PROFILE

              </div>

              <div>

  <h1 className="text-4xl font-bold text-white">

    {
      builder.display_name ||
      "Anonymous Builder"
    }

  </h1>

  <p className="mt-2 text-blue-300">

    {
      builder.builder_identity ||
      "Builder"
    }

  </p>

</div>

              <p className="mt-4 max-w-2xl text-slate-400 leading-relaxed">

                {
                  builder.bio ||
                  "Building momentum and exploring opportunities."
                }

              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-slate-400">

                  Builder Level

                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">

                  {
                    builder.builder_level || 1
                  }

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-slate-400">

                  Streak

                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">

                  {
                    builder.streak || 0
                  }

                </h3>

              </div>

            </div>

          </div>

        </BuilderCard>


        {/* BUILDER MISSION */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Builder Mission

  </h2>

  <p className="mt-4 text-slate-300 leading-relaxed">

    {
      builder.mission ||
      "Mission not defined yet."
    }

  </p>

</BuilderCard>


 {/* WHY I BUILD */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Why I Build

  </h2>

  <p className="mt-4 text-slate-300 leading-relaxed">

    {
      builder.why_build ||
      "No builder story yet."
    }

  </p>

</BuilderCard>

        {/* SKILLS */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Skills & Interests

          </h2>

          <div className="mt-5 flex flex-wrap gap-3">

            {builder.skills?.map(
              (
                skill,
                index
              ) => (

                <div
                  key={index}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                >

                  {skill}

                </div>

              )
            )}

          </div>

        </BuilderCard>

      {/* BUILDER VISION */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Builder Vision

  </h2>

  <p className="mt-4 text-slate-300">

    {
      builder.vision ||
      "Vision still evolving."
    }

  </p>

</BuilderCard>

        {/* CAN HELP */}

        <BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Can Help With

  </h2>

  <div className="mt-5 flex flex-wrap gap-3">

    {builder.can_help_with?.map(
      (item,index)=>(

        <div
          key={index}
          className="
            rounded-full
            border
            border-green-400/20
            bg-green-500/10
            px-4
            py-2
            text-sm
            text-green-200
          "
        >

          {item}

        </div>

      )
    )}

  </div>

</BuilderCard>

 {/* NEED HELP */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Need Help With

  </h2>

  <div className="mt-5 flex flex-wrap gap-3">

    {builder.need_help_with?.map(
      (item,index)=>(

        <div
          key={index}
          className="
            rounded-full
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-4
            py-2
            text-sm
            text-yellow-200
          "
        >

          {item}

        </div>

      )
    )}

  </div>

</BuilderCard>



<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Suggested Builder Matches

  </h2>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    {suggestedBuilders.map(
      (match) => (

        <div
          key={match.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >

          <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

            MATCH SCORE:
            {" "}
            {match.matchScore}

          </div>

          <h3 className="text-xl font-semibold text-white">

            {
  match.display_name ||
  "Builder"
}

          </h3>

<p className="mt-1 text-sm text-blue-300">

  {
    match.builder_identity ||
    "Builder"
  }

</p>


          <p className="mt-3 text-slate-400">

            {
  match.mission ||
  "Mission not defined yet."
}
          </p>

        </div>

      )
    )}

  </div>

</BuilderCard>


{/* CONNECT */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Connect With Builder

  </h2>

  <p className="mt-4 text-slate-400 leading-relaxed">

    Reach out to collaborate,
    build together,
    share opportunities,
    or create accountability.

  </p>

  <div className="mt-6 flex flex-col gap-4 sm:flex-row">

<button
  onClick={
    sendConnectionRequest
  }
  disabled={
    sendingRequest
  }
  className="
    flex-1
    rounded-2xl
    bg-blue-500
    px-6
    py-4
    text-center
    font-semibold
    text-white
    transition-all
    hover:scale-[1.02]
    disabled:opacity-50
  "
>

  {
    sendingRequest
      ? "Sending..."
      : "Request Connection"
  }

</button>


    {/* WHATSAPP */}

    {builder.whatsapp_number ? (

      <a
        href={`https://wa.me/${builder.whatsapp_number}?text=${connectionMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex-1
          rounded-2xl
          bg-green-500
          px-6
          py-4
          text-center
          font-semibold
          text-white
          transition-all
          hover:scale-[1.02]
        "
      >

        Connect Through WhatsApp

      </a>

    ) : null}

    {/* EMAIL */}

    {builder.contact_email ? (

      <a
        href={`mailto:${builder.contact_email}`}
        className="
          flex-1
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-6
          py-4
          text-center
          font-semibold
          text-slate-300
          transition-all
          hover:bg-white/10
        "
      >

        Connect Through Email

      </a>

    ) : null}

  </div>

  {/* FALLBACK */}

  {!builder.whatsapp_number &&
   !builder.contact_email && (

    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">

      <p className="text-slate-400">

        This builder has not enabled connection options yet.

      </p>

    </div>

  )}

</BuilderCard>

      </div>

    </BuilderShell>

  );
}