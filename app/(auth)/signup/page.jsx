"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {

const router=useRouter();

const {
user,
loading:authLoading,
}=useAuth();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);

useEffect(()=>{

if(!authLoading && user){

router.push("/onboarding");

}

},[
user,
authLoading,
router
]);

async function handleSignup(e){

e.preventDefault();

setLoading(true);

const {
data,
error
}=await supabase.auth.signUp({

email,
password

});

setLoading(false);

if(error){

alert(error.message);

return;

}

if(data?.user){

router.push("/onboarding");

}

}

async function handleGoogleSignup(){

const {error}=await supabase.auth.signInWithOAuth({

provider:"google",

options:{

redirectTo:
window.location.origin+
"/onboarding"

}

});

if(error){

alert(error.message);

}

}

if(authLoading){

return(

<main className="flex min-h-screen items-center justify-center bg-[#050816]">

<p className="text-slate-400">

Preparing your builder journey...

</p>

</main>

);

}

if(user) return null;

return(

<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6 text-white">

<div className="pointer-events-none absolute inset-0">

<div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl"/>

<div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/20 blur-3xl"/>

</div>

<motion.div

initial={{opacity:0,y:14}}
animate={{opacity:1,y:0}}
transition={{duration:.45}}

className="
relative
z-10
w-full
max-w-md
rounded-[32px]
border
border-white/10
bg-white/5
p-8
backdrop-blur-2xl
"

>

<div className="flex flex-col items-center">

<Image
src="/logo.png"
alt="PipuPath Logo"
width={72}
height={72}
priority
/>

<h1 className="mt-6 text-center text-4xl font-bold">

Begin Your Builder Journey

</h1>

<p className="mt-3 text-center text-slate-400">

Discover your strengths, build real skills and unlock your future.

</p>

</div>

<button

type="button"
onClick={handleGoogleSignup}

className="
mt-10
w-full
rounded-2xl
border
border-white/10
bg-white/10
px-5
py-4
font-semibold
"

>

Continue with Google

</button>

<div className="my-8 flex items-center gap-4">

<div className="h-px flex-1 bg-white/10"/>

<span className="text-xs text-slate-500">

OR USE EMAIL

</span>

<div className="h-px flex-1 bg-white/10"/>

</div>

<form onSubmit={handleSignup}>

<div className="space-y-4">

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
className="
w-full
rounded-2xl
border
border-white/10
bg-white/5
px-5
py-4
"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
className="
w-full
rounded-2xl
border
border-white/10
bg-white/5
px-5
py-4
"
/>

</div>

<button

type="submit"
disabled={loading}

className="
mt-6
w-full
rounded-2xl
bg-yellow-500
px-5
py-4
font-semibold
text-black
"

>

{loading
? "Loading..."
: "Begin Journey ⚡"}

</button>

</form>

<p className="mt-8 text-center text-sm text-slate-400">

Already building?{" "}

<Link
href="/login"
className="text-blue-300 font-semibold"
>

Continue Journey

</Link>

</p>

</motion.div>

</main>

);

}