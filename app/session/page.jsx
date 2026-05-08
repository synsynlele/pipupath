import NavBar from "@/components/NavBar";

export default function SessionPage(){

  return (
    <div className="min-h-screen bg-black text-white">

      <NavBar />

      <div className="p-8">

        <h1 className="text-4xl font-bold">
          Live Session
        </h1>

        <p className="mt-4 text-zinc-400">
          Join your learning session.
        </p>

      </div>

    </div>
  );
}