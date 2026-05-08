import NavBar from "@/components/NavBar";

export default function MagicPenPage(){

  return (
    <div className="min-h-screen bg-black text-white">

      <NavBar />

      <div className="p-8">

        <h1 className="text-4xl font-bold">
          MagicPen
        </h1>

        <p className="mt-4 text-zinc-400">
          AI readiness engine.
        </p>

      </div>

    </div>
  );
}