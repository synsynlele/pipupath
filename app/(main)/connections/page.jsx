"use client";

import {
  useEffect,
  useState,
} from "react";

import BuilderShell
from "@/components/layout/BuilderShell";

import BuilderCard
from "@/components/ui/BuilderCard";

import { supabase }
from "@/lib/supabase";

import { useAuth }
from "@/context/AuthContext";

export default function ConnectionsPage() {

  const { user } =
    useAuth();

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

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function loadRequests() {

      if (!user) return;

      try {

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
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
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
            )
            .order(
              "created_at",
              {
                ascending: false,
              }
            );

        setIncomingRequests(
          incoming || []
        );

        setOutgoingRequests(
          outgoing || []
        );

const acceptedConnections = [

  ...(incoming || []),

  ...(outgoing || [])

].filter(

  request =>
    request.status ===
    "accepted"

);

setConnectedBuilders(
  acceptedConnections
);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    loadRequests();

  }, [user]);

  async function updateRequest(
    requestId,
    status
  ) {

    try {

      const { error } =
        await supabase
          .from(
            "connection_requests"
          )
          .update({
            status,
          })
          .eq(
            "id",
            requestId
          );

      if (error)
        throw error;

      setIncomingRequests(
        (previous) =>
          previous.map(
            (request) =>
              request.id === requestId
                ? {
                    ...request,
                    status,
                  }
                : request
          )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update request."
      );
    }
  }

  return (

    <BuilderShell
      title="Connections"
      subtitle="Builder Relationships"
    >

      <div className="flex flex-col gap-6">

        <div>

          <h1 className="text-5xl font-bold text-white">

            Builder Connections

          </h1>

          <p className="mt-4 text-slate-400">

            Build meaningful relationships,
            collaborations,
            accountability partnerships,
            and future teams.

          </p>

        </div>

        {/* INCOMING */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Incoming Requests

          </h2>

          {loading ? (

            <p className="mt-4 text-slate-400">

              Loading...

            </p>

          ) : incomingRequests.length === 0 ? (

            <p className="mt-4 text-slate-400">

              No incoming requests.

            </p>

          ) : (

            <div className="mt-6 flex flex-col gap-4">

              {incomingRequests.map(
                (request) => (

                  <div
                    key={request.id}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div>

  <h3 className="text-lg font-semibold text-white">

    {request.sender_name ||
      "Unknown Builder"}

  </h3>

  <p className="mt-2 text-slate-400">

    Wants to connect with you.

  </p>

</div>

                    <p className="mt-2 text-sm text-slate-500">

                      Status:
                      {" "}
                      {request.status}

                    </p>

                    {request.status ===
                      "pending" && (

                      <div className="mt-4 flex gap-3">

                        <button
                          onClick={() =>
                            updateRequest(
                              request.id,
                              "accepted"
                            )
                          }
                          className="
                            rounded-xl
                            bg-green-500
                            px-4
                            py-2
                            text-white
                          "
                        >

                          Accept

                        </button>

                        <button
                          onClick={() =>
                            updateRequest(
                              request.id,
                              "declined"
                            )
                          }
                          className="
                            rounded-xl
                            bg-red-500
                            px-4
                            py-2
                            text-white
                          "
                        >

                          Decline

                        </button>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

          )}

        </BuilderCard>

        {/* OUTGOING */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Sent Requests

          </h2>

          {loading ? (

            <p className="mt-4 text-slate-400">

              Loading...

            </p>

          ) : outgoingRequests.length === 0 ? (

            <p className="mt-4 text-slate-400">

              No sent requests.

            </p>

          ) : (

            <div className="mt-6 flex flex-col gap-4">

              {outgoingRequests.map(
                (request) => (

                  <div
                    key={request.id}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-5
                    "
                  >

                    <div>

  <h3 className="text-lg font-semibold text-white">

    {request.receiver_name ||
      "Unknown Builder"}

  </h3>

  <p className="mt-2 text-slate-400">

    Connection request sent.

  </p>

</div>

                    <p className="mt-2 text-sm text-slate-500">

                      Status:
                      {" "}
                      {request.status}

                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </BuilderCard>

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Connected Builders

  </h2>

  {connectedBuilders.length === 0 ? (

    <p className="mt-4 text-slate-400">

      No active connections yet.

    </p>

  ) : (

    <div className="mt-6 flex flex-col gap-4">

      {connectedBuilders.map(
        (connection) => (

          <div
            key={connection.id}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >

            <h3 className="text-lg font-semibold text-white">

              {
                connection.sender_id ===
                user.id

                ? connection.receiver_name

                : connection.sender_name
              }

            </h3>

            <p className="mt-2 text-slate-400">

              Connected Builder

            </p>

            <p className="mt-2 text-sm text-green-400">

              Status: Accepted

            </p>

          </div>

        )
      )}

    </div>

  )}

</BuilderCard>

      </div>

    </BuilderShell>
  );
}