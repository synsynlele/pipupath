import Image from "next/image";

export default function BrandLogo({

  size = 44,

  label = true,

  gold = true,

}) {

  return (

    <div className="flex items-center gap-3">

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: size,
          height: size,
        }}
      >

        <Image
          src={
            gold
              ? "/pipupath-gold.png"
              : "/pipupath-black.png"
          }
          alt="PipuPath"
          fill
          className="object-contain"
          priority
        />

      </div>

      {label && (

        <div>

          <p className="text-lg font-semibold tracking-tight text-[#0F172A]">

            PipuPath

          </p>

          <p className="text-xs text-[#64748B]">

            Adaptive Human Development

          </p>

        </div>

      )}

    </div>
  );
}