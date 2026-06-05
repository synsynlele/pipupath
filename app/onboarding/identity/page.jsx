"use client";

import { useRouter } from "next/navigation";
import useProfileStore from "@/stores/profileStore";

export default function IdentityPage() {

const router=useRouter();

const {
builderProfile,
completeOnboarding
}=useProfileStore();

const identity=
builderProfile;

if(!identity){

router.push("/onboarding");

return null;

}

function beginJourney(){

completeOnboarding(
identity
);

router.push(
"/journey"
);

}

return(

<main className="min-h-screen bg-[#050816] text-white px-6 py-10">

<div className="max-w-5xl mx-auto">

{/* TOP */}

<div className="text-center">

<div className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2">

<span className="text-sm text-yellow-400">

⚔ Identity Unlocked

</span>

</div>

<h1 className="mt-8 text-5xl font-bold">

{identity.identity}

</h1>

<p className="mt-8 text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">

{identity.summary}

</p>

</div>


<div className="grid md:grid-cols-2 gap-8 mt-16">

<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-semibold">

⭐ Powers You Already Have

</h2>

<div className="mt-6 space-y-4">

{identity.strengths?.map((item)=>(

<div
key={item}
className="rounded-2xl bg-black/20 p-4"
>

{item}

</div>

))}

</div>

</div>


<div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

<h2 className="text-2xl font-semibold">

🧩 Things To Watch Out For

</h2>

<div className="mt-6 space-y-4">

{identity.risks?.map((item)=>(

<div
key={item}
className="rounded-2xl bg-black/20 p-4"
>

{item}

</div>

))}

</div>

</div>

</div>


<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 mt-8">

<h2 className="text-2xl font-semibold">

🚀 Quests You May Enjoy

</h2>

<div className="flex flex-wrap gap-3 mt-6">

{identity.builderPaths?.map((item)=>(

<div
key={item}
className="rounded-full border border-white/10 px-5 py-3 bg-black/20"
>

{item}

</div>

))}

</div>

</div>


<div className="mt-12 text-center">

<button

onClick={beginJourney}

className="
inline-flex
rounded-2xl
px-10
py-5
bg-yellow-500
text-black
font-bold
"

>

Begin My Journey ⚡

</button>

</div>

</div>

</main>

)

}