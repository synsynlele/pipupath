"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import LiveSignals from "@/components/home/LiveSignals";
import SectionTransition from "@/components/home/SectionTransition";
import SystemMap from "@/components/home/SystemMap";
import ProblemSection from "@/components/home/ProblemSection";
import ProductGrid from "@/components/home/ProductGrid";
import EcosystemPulse from "@/components/home/EcosystemPulse";
import AdaptiveEntry from "@/components/home/AdaptiveEntry";
import Progression from "@/components/home/Progression";
import Schools from "@/components/home/Schools";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";

import IdentityModal from "@/components/onboarding/IdentityModal";

export default function Home() {

  const [identityOpen, setIdentityOpen] = useState(false);

  useEffect(() => {

    function handleOpen() {
      setIdentityOpen(true);
    }

    window.addEventListener(
      "openIdentityModal",
      handleOpen
    );

    return () =>
      window.removeEventListener(
        "openIdentityModal",
        handleOpen
      );

  }, []);

  return (

    <main className="relative overflow-hidden bg-[#050816] text-white">

      {/* IDENTITY MODAL */}
      <IdentityModal
        open={identityOpen}
        setOpen={setIdentityOpen}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10">

        <Navbar />

        <Hero />

        <LiveSignals />

        <SectionTransition />

        <SystemMap />

        <SectionTransition flip />

        <ProblemSection />

        <SectionTransition />

        <ProductGrid />

        <EcosystemPulse />

        <AdaptiveEntry />

        <SectionTransition flip />

        <Progression />

        <SectionTransition />

        <Schools />

        <SectionTransition flip />

        <Testimonials />

        <SectionTransition />

        <FinalCTA />

        <Footer />

      </div>

    </main>

  );

}