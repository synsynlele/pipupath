"use client";

import Image from "next/image";

export default function PipuPathLogo({

  size = "md",

  showText = true

}) {

  const sizes = {

    sm: {
      logo: 42,
      text: "text-lg"
    },

    md: {
      logo: 52,
      text: "text-xl"
    },

    lg: {
      logo: 72,
      text: "text-3xl"
    }

  };

  const current = sizes[size];

  return (

    <div className="flex items-center gap-4">

      {/* LOGO */}
      <div
        className="
        relative
        shrink-0
        "
      >

        <Image
          src="/logo.png"
          alt="PipuPath"
          width={current.logo}
          height={current.logo}
          priority
          className="
          object-contain
          drop-shadow-[0_0_25px_rgba(212,164,59,0.25)]
          "
        />

      </div>

      {/* TEXT */}
      {showText && (

        <div>

          <div
            className={`
            font-black
            tracking-tight
            text-white
            ${current.text}
            `}
          >

            PipuPath

          </div>

          <div className="text-xs text-white/40">

            HumanOS Infrastructure

          </div>

        </div>

      )}

    </div>

  );

}