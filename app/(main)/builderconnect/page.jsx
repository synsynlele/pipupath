"use client";

import {
  useEffect,
  useState,
} from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import FloatingInput
from "@/components/ui/FloatingInput";

import { supabase }
from "@/lib/supabase";

import Link
from "next/link";

import { useAuth }
from "@/context/AuthContext";

export default function BuilderConnectPage() {

const { user } = useAuth();

  const [builders, setBuilders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

const [
  activeTab,
  setActiveTab,
] = useState("discover");

const [
  incomingRequests,
  setIncomingRequests,
] = useState([]);

const [
  outgoingRequests,
  setOutgoingRequests,
] = useState([]);

const [
  connectedBuilders,
  setConnectedBuilders,
] = useState([]);

  useEffect(() => {

    async function loadBuilders() {

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "public_visibility",
            true
          );

      if (error) {

        console.error(error);

      } else {

        setBuilders(
  data.filter(
    builder =>
      builder.id !== user?.id
  )
);
      }

      setLoading(false);
    }

    loadBuilders();

  }, []);

  const filteredBuilders =
    builders.filter((builder) => {

      const searchText =
        search.toLowerCase();


      return (

  builder?.builder_identity
    ?.toLowerCase()
    ?.includes(searchText)

  ||

  builder?.mission
    ?.toLowerCase()
    ?.includes(searchText)

  ||

  builder?.can_help_with
    ?.join(" ")
    ?.toLowerCase()
    ?.includes(searchText)

  ||

  builder?.need_help_with
    ?.join(" ")
    ?.toLowerCase()
    ?.includes(searchText)

);
    });

useEffect(() => {

  async function loadNetwork() {

    if (!user) return;

    const {
      data: incoming,
    } =
      await supabase
        .from(
          "connection_requests"
        )
        .select("*")
        .eq(
          "receiver_id",
          user.id
        );

    const {
      data: outgoing,
    } =
      await supabase
        .from(
          "connection_requests"
        )
        .select("*")
        .eq(
          "sender_id",
          user.id
        );

    setIncomingRequests(
      incoming || []
    );

    setOutgoingRequests(
      outgoing || []
    );

    const accepted = [

  ...(incoming || []),

  ...(outgoing || [])

].filter(
  request =>
    request.status ===
    "accepted"
);

const connectedIds =
  accepted.map(
    (request) =>

      request.sender_id ===
      user.id

        ? request.receiver_id

        : request.sender_id
  );

const {
  data: profiles
} =
  await supabase
    .from("profiles")
    .select("*")
    .in(
      "id",
      connectedIds
    );

setConnectedBuilders(
  profiles || []
);

console.log(
  "CONNECTED IDS:",
  connectedIds
);

console.log(
  "CONNECTED PROFILES:",
  profiles
);
  }

  loadNetwork();

}, [user]);


async function acceptRequest(
  requestId
) {

  const { error } =
    await supabase
      .from(
        "connection_requests"
      )
      .update({

        status:
          "accepted",

      })
      .eq(
        "id",
        requestId
      );

  if (error) {

    console.error(error);

    alert(
      "Failed to accept request."
    );

    return;
  }

  window.location.reload();
}


  return (

    <BuilderShell
      title="BuilderConnect"
      subtitle="Builder Ecosystem"
    >

      <div className="flex flex-col">

        {/* HERO */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white">

          Discover builders.
          Build together.

        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">

          Connect with ambitious builders,
          collaborators,
          creators,
          and operators
          growing through PipuPath.

        </p>

<div className="mt-10 flex gap-3">

  <button
    onClick={() =>
      setActiveTab(
        "discover"
      )
    }
    className={`
      rounded-xl
      px-5
      py-3
      font-medium

      ${
        activeTab ===
        "discover"

          ? "bg-blue-500 text-white"

          : "bg-white/5 text-slate-400"
      }
    `}
  >

    Discover

  </button>

  <button
    onClick={() =>
      setActiveTab(
        "network"
      )
    }
    className={`
      rounded-xl
      px-5
      py-3
      font-medium

      ${
        activeTab ===
        "network"

          ? "bg-blue-500 text-white"

          : "bg-white/5 text-slate-400"
      }
    `}
  >

    My Network

  </button>

</div>

{activeTab === "discover" && (

  <>

        {/* SEARCH */}

        <div className="mt-10">

          <FloatingInput
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search builders, skills, or focus..."
          />

        </div>

        {/* RESULTS */}

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          {loading ? (

            <BuilderCard>

              <p className="text-slate-400">

                Loading builders...

              </p>

            </BuilderCard>

          ) : filteredBuilders.length === 0 ? (

            <BuilderCard>

              <p className="text-slate-400">

                No builders found.

              </p>

            </BuilderCard>

          ) : (

            filteredBuilders.map(
              (builder) => (

               <div key={builder.id}>

  <BuilderCard>

                  <div className="flex flex-col">

                    {/* STATUS */}

                    <div className="mb-3 w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">

                      BUILDER

                    </div>

                    {/* IDENTITY */}

                    <div>

  <h2 className="text-2xl font-semibold text-white">

    {
      builder.display_name ||
      "Anonymous Builder"
    }

  </h2>

  <p className="mt-1 text-sm text-blue-300">

    {
      builder.builder_identity ||
      "Builder"
    }

  </p>

</div>

                    {/* MISSION */}

<div className="mt-4">

  <p className="text-xs uppercase tracking-wide text-slate-500">

    Mission

  </p>

  <p className="mt-2 text-slate-300 leading-relaxed">

    {
      builder.mission ||
      "Mission not defined yet."
    }

  </p>

</div>

                    {/* CAN HELP WITH */}

<div className="mt-5">

  <p className="text-xs uppercase tracking-wide text-slate-500">

    Can Help With

  </p>

  <div className="mt-3 flex flex-wrap gap-2">

    {builder.can_help_with?.map(
      (item,index)=>(

        <div
          key={index}
          className="
            rounded-full
            border
            border-green-400/20
            bg-green-500/10
            px-3
            py-1
            text-xs
            text-green-200
          "
        >

          {item}

        </div>

      )
    )}

  </div>

</div>

                   {/* NEED HELP WITH */}

<div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-500/5 p-4">

  <p className="text-xs uppercase tracking-wide text-yellow-300">

    Need Help With

  </p>

  <div className="mt-3 flex flex-wrap gap-2">

    {builder.need_help_with?.map(
      (item,index)=>(

        <div
          key={index}
          className="
            rounded-full
            border
            border-yellow-400/20
            bg-yellow-500/10
            px-3
            py-1
            text-xs
            text-yellow-200
          "
        >

          {item}

        </div>

      )
    )}

  </div>

</div>

                    {/* CTA */}

                   <Link
  href={`/builder/${builder.id}`}
  className="
    mt-6
    rounded-2xl
    bg-blue-500
    px-5
    py-4
    text-center
    font-semibold
    text-white
    transition-all
    hover:scale-[1.02]
  "
>

  View Builder

</Link>

                  </div>

                </BuilderCard>


</div>

              )
            )

          )}

               </div>

  </>

)}

{activeTab === "network" && (

  <div className="mt-10 flex flex-col gap-6">

    {/* INCOMING */}

    <BuilderCard>

      <h2 className="text-2xl font-semibold text-white">

        Incoming Requests

      </h2>

      <div className="mt-5 space-y-4">

        {incomingRequests.length === 0 ? (

          <p className="text-slate-400">

            No incoming requests.

          </p>

        ) : (

          incomingRequests.map(
            (request) => (

              <div
                key={request.id}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >

                <h3 className="text-white font-semibold">

                  {request.sender_name}

                </h3>

                <p className="mt-2 text-slate-400">

                  {request.status}

                </p>

                {request.status ===
                  "pending" && (

                  <button

                    onClick={() =>
                      acceptRequest(
                        request.id
                      )
                    }

                    className="
                      mt-4
                      rounded-xl
                      bg-green-500
                      px-4
                      py-2
                      text-white
                    "
                  >

                    Accept

                  </button>

                )}

              </div>

            )
          )

        )}

      </div>

    </BuilderCard>


<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Sent Requests

  </h2>

  <div className="mt-5 space-y-4">

    {outgoingRequests.map(
      (request) => (

        <div
          key={request.id}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
          "
        >

          <h3 className="text-white font-semibold">

            {request.receiver_name}

          </h3>

          <p className="mt-2 text-slate-400">

            {request.status}

          </p>

        </div>

      )
    )}

  </div>

</BuilderCard>


<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Connected Builders

  </h2>

  <div className="mt-5 space-y-4">

    {connectedBuilders.map(
  (builder) => (

        <div
         key={builder.id}
          className="
            rounded-2xl
            border
            border-green-400/20
            bg-green-500/5
            p-4
          "
        >

          <h3 className="text-white font-semibold">

  {
    builder.display_name ||
    "Builder"
  }

</h3>

<p className="mt-1 text-blue-300 text-sm">

  {
    builder.builder_identity ||
    "Builder"
  }

</p>

<p className="mt-3 text-slate-400">

  {
    builder.mission ||
    "Mission not defined yet."
  }

</p>

<Link
  href={`/builder/${builder.id}`}
  className="
    mt-4
    inline-block
    rounded-xl
    bg-blue-500
    px-4
    py-2
    text-sm
    font-medium
    text-white
  "
>

  View Builder

</Link>

        </div>

      )
    )}

  </div>

</BuilderCard>

  </div>

)}

      </div>


    </BuilderShell>
  );
}