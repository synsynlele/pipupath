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

export default function SettingsPage() {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profileId, setProfileId] =
    useState(null);

  const [bio, setBio] =
    useState("");

const [displayName, setDisplayName] =
  useState("");

  const [focus, setFocus] =
    useState("");

  const [skills, setSkills] =
    useState("");

const [mission, setMission] =
  useState("");

const [whyBuild, setWhyBuild] =
  useState("");

const [vision, setVision] =
  useState("");

const [canHelpWith, setCanHelpWith] =
  useState("");

const [needHelpWith, setNeedHelpWith] =
  useState("");

const [
  whatsapp,
  setWhatsapp,
] = useState("");

const [
  contactEmail,
  setContactEmail,
] = useState("");

  const [
    collaboration,
    setCollaboration,
  ] = useState("");

  const [
    visibility,
    setVisibility,
  ] = useState(true);

  useEffect(() => {

    async function loadProfile() {

      const {
        data: authData,
      } =
        await supabase.auth.getUser();

      const user =
        authData?.user;

      if (!user) return;

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "id",
            user.id
          )
          .single();

      if (error) {

        console.error(error);

      } else {

        setProfileId(data.id);

setDisplayName(
  data.display_name || ""
);

setWhatsapp(
  data.whatsapp_number || ""
);

setContactEmail(
  data.contact_email || ""
);

        setBio(
          data.bio || ""
        );

        setFocus(
          data.current_focus || ""
        );

        setSkills(
          data.skills?.join(", ")
          || ""
        );

setMission(
  data.mission || ""
);

setWhyBuild(
  data.why_build || ""
);

setVision(
  data.vision || ""
);

setCanHelpWith(
  data.can_help_with?.join(", ")
  || ""
);

setNeedHelpWith(
  data.need_help_with?.join(", ")
  || ""
);

        setCollaboration(
          data.collaboration_interest
          || ""
        );

        setVisibility(
          data.public_visibility
          ?? true
        );
      }

      setLoading(false);
    }

    loadProfile();

  }, []);

  async function handleSave() {

    setSaving(true);

    try {

      const {
        error,
      } =
        await supabase
          .from("profiles")
          .update({

display_name:
  displayName,

            bio,

            current_focus:
              focus,

            skills:
              skills
                .split(",")
                .map((s) =>
                  s.trim()
                ),

mission,

why_build:
  whyBuild,

vision,

can_help_with:
  canHelpWith
    .split(",")
    .map((item) =>
      item.trim()
    ),

need_help_with:
  needHelpWith
    .split(",")
    .map((item) =>
      item.trim()
    ),

            collaboration_interest:
              collaboration,

            public_visibility:
              visibility,

whatsapp_number:
  whatsapp,

contact_email:
  contactEmail,

          })

          .eq(
            "id",
            profileId
          );

      if (error) {

        console.error(error);

        alert(
          "Failed to save profile."
        );

      } else {

        alert(
          "Builder profile updated."
        );
      }

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);
    }
  }

  if (loading) {

    return (

      <BuilderShell
        title="Settings"
        subtitle="Loading..."
      >

        <BuilderCard>

          <p className="text-slate-400">

            Loading builder settings...

          </p>

        </BuilderCard>

      </BuilderShell>
    );
  }

  return (

    <BuilderShell
      title="Builder Settings"
      subtitle="Identity & Visibility"
    >

      <div className="flex flex-col gap-5">

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Display Name

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={displayName}
      onChange={(e) =>
        setDisplayName(
          e.target.value
        )
      }
      placeholder="What should builders call you?"
    />

  </div>

</BuilderCard>


        {/* BIO */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Builder Bio

          </h2>

          <div className="mt-5">

            <FloatingInput
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              placeholder="Tell builders who you are and what you're building..."
            />

          </div>

        </BuilderCard>

{/* MISSION */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Builder Mission

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={mission}
      onChange={(e)=>
        setMission(
          e.target.value
        )
      }
      placeholder="What future do you want to help create?"
    />

  </div>

</BuilderCard>


{/* WHY I BUILD */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Why I Build

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={whyBuild}
      onChange={(e)=>
        setWhyBuild(
          e.target.value
        )
      }
      placeholder="What personal experience drives you?"
    />

  </div>

</BuilderCard>

        {/* FOCUS */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Current Focus

          </h2>

          <div className="mt-5">

            <FloatingInput
              value={focus}
              onChange={(e) =>
                setFocus(e.target.value)
              }
              placeholder="What are you focused on right now?"
            />

          </div>

        </BuilderCard>

{/* CURRENT FOCUS */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Builder Vision

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={vision}
      onChange={(e)=>
        setVision(
          e.target.value
        )
      }
      placeholder="What are you working toward long term?"
    />

  </div>

</BuilderCard>


        {/* SKILLS */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Skills & Interests

          </h2>

          <div className="mt-5">

            <FloatingInput
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="Video Editing, Design, Writing, AI..."
            />

          </div>

        </BuilderCard>

 {/* CAN HELP */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Can Help With

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={canHelpWith}
      onChange={(e)=>
        setCanHelpWith(
          e.target.value
        )
      }
      placeholder="Teaching, Writing, Design..."
    />

  </div>

</BuilderCard>

{/* NEED HELP */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Need Help With

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={needHelpWith}
      onChange={(e)=>
        setNeedHelpWith(
          e.target.value
        )
      }
      placeholder="Marketing, Funding, Public Speaking..."
    />

  </div>

</BuilderCard>

        {/* COLLAB */}

        <BuilderCard>

          <h2 className="text-2xl font-semibold text-white">

            Collaboration Interest

          </h2>

          <div className="mt-5">

            <FloatingInput
              value={collaboration}
              onChange={(e) =>
                setCollaboration(e.target.value)
              }
              placeholder="What kind of builders or collaborators are you looking for?"
            />

          </div>

        </BuilderCard>

{/* WHATSAPP */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    WhatsApp Number

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={whatsapp}
      onChange={(e) =>
        setWhatsapp(e.target.value)
      }
      placeholder="2348012345678"
    />

  </div>

</BuilderCard>

{/* CONTACT EMAIL */}

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Contact Email

  </h2>

  <div className="mt-5">

    <FloatingInput
      value={contactEmail}
      onChange={(e) =>
        setContactEmail(e.target.value)
      }
      placeholder="you@example.com"
    />

  </div>

</BuilderCard>


        {/* VISIBILITY */}

        <BuilderCard>

          <div className="flex items-center justify-between gap-4">

            <div>

              <h2 className="text-2xl font-semibold text-white">

                Public Visibility

              </h2>

              <p className="mt-2 text-slate-400">

                Allow your profile to appear inside BuilderConnect.

              </p>

            </div>

            <button
              onClick={() =>
                setVisibility(
                  !visibility
                )
              }
              className={`
                h-8
                w-16
                rounded-full
                transition-all

                ${
                  visibility
                    ? "bg-green-500"
                    : "bg-white/10"
                }
              `}
            >

              <div
                className={`
                  h-6
                  w-6
                  rounded-full
                  bg-white
                  transition-all

                  ${
                    visibility
                      ? "translate-x-8"
                      : "translate-x-1"
                  }
                `}
              />

            </button>

          </div>

        </BuilderCard>

        {/* SAVE */}

        <GlowButton
          onClick={handleSave}

          disabled={saving}
        >

          {
            saving
              ? "Saving Builder Profile..."
              : "Save Builder Profile"
          }

        </GlowButton>

      </div>

<BuilderCard>

  <h2 className="text-2xl font-semibold text-white">

    Account

  </h2>

  <div className="mt-5">

    <GlowButton

      onClick={async()=>{

        await supabase
          .auth
          .signOut();

        window.location.href =
          "/login";

      }}

    >

      Logout

    </GlowButton>

  </div>

</BuilderCard>


    </BuilderShell>
  );
}