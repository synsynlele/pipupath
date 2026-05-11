export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-28">

      {/* Gold Label */}
      <div className="mb-6 px-4 py-2 rounded-full bg-[#D4A017]/10 text-[#D4A017] text-sm font-semibold">
        Adaptive Human Development
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight text-[#0F172A]">
        Become who you were meant to be.
      </h1>

      {/* Supporting Text */}
      <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
        A psychologically intelligent platform that guides growth through
        adaptive missions, behavioral feedback, and continuous progress.
      </p>

      {/* CTA */}
      <div className="mt-10 flex items-center gap-4">

        <button className="bg-[#0F172A] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition">
          Start Your Journey
        </button>

        <button className="border border-[#0F172A] text-[#0F172A] px-6 py-3 rounded-2xl text-sm font-medium">
          Learn More
        </button>

      </div>

    </section>
  );
}