import { supabase } from "../../../lib/supabase"

import BookingModal from "../../../components/sessions/BookingModal"

export default async function GuidePage({
  params,
}: {
  params: { slug: string }
}) {

  console.log("PARAMS:", params.slug)

const { data: guide, error } = await supabase
  .from("guides")
  .select(`
    *,
    guide_specialties (*),
    guide_stats (*)
  `)
  .eq("id", params.slug)
  .single()

console.log("GUIDE:", guide)
console.log("ERROR:", error)

if (!guide) {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      Guide not found
    </div>
  )
}

const stats = guide.guide_stats?.[0]
const specialties = guide.guide_specialties || []

 return (
  <div className="min-h-screen bg-black text-white">

    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* HERO */}

      <div className="flex flex-col md:flex-row gap-10">

        <img
          src={guide.avatar_url || "/placeholder.png"}
          alt=""
          className="w-40 h-40 rounded-full object-cover border border-white/20"
        />

        <div className="flex-1">

          <h1 className="text-5xl font-bold">
            {guide.full_name || "Guide"}
          </h1>

          <p className="text-yellow-400 mt-3 text-xl">
            {guide.headline}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            {specialties.map((item:any) => (
              <span
                key={item.id}
                className="px-4 py-2 rounded-full bg-white/10"
              >
                {item.specialty}
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">

        <div className="bg-white/5 rounded-3xl p-6">
          <p className="text-4xl font-bold">
            {stats?.sessions_completed || 0}
          </p>

          <p className="text-white/60 mt-2">
            Sessions
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6">
          <p className="text-4xl font-bold">
            {stats?.students_helped || 0}
          </p>

          <p className="text-white/60 mt-2">
            Students Helped
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6">
          <p className="text-4xl font-bold">
            {stats?.rating || 0}
          </p>

          <p className="text-white/60 mt-2">
            Rating
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6">
          <p className="text-4xl font-bold">
            {stats?.xp_earned || 0}
          </p>

          <p className="text-white/60 mt-2">
            XP Earned
          </p>
        </div>

      </div>

      {/* ABOUT */}

      <div className="mt-20">

        <h2 className="text-3xl font-bold">
          About
        </h2>

        <p className="text-white/70 mt-6 text-lg leading-relaxed max-w-3xl">
          {guide.about || "No bio yet"}
        </p>

      </div>

      {/* BOOKING */}

      <div className="mt-20 max-w-xl">

        <BookingModal
          guideId={guide.id}
          studentId="456"
        />

      </div>

    </div>

   </div>
)
}