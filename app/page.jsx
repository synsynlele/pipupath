import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <Navbar />
      <Hero />
    </main>
  );
}