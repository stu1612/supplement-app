import Image from "next/image";

export default function Playground() {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-visible pb-32">
      {/* Blurred parallax background */}
      <div className="mission-parallax-bg absolute inset-0 z-0 blur-md brightness-[0.25]" />

      {/* Centre card */}
      <div className="relative z-10 w-[90%] max-w-md bg-bg-dark-secondary rounded-2xl border border-surface shadow-[0_32px_80px_rgba(0,0,0,0.85)] overflow-visible flex flex-col">
        {/* Content — top half */}
        <div className="px-10 pt-10 relative z-10">
          <p className="font-dm-sans font-medium text-xs text-accent tracking-widest uppercase mb-4">
            New — Collagen Series
          </p>
          <h2 className="font-condensed font-black uppercase tracking-tight leading-none text-text-primary text-[clamp(1.75rem,3.5vw,2.5rem)]">
            Recover stronger.
            <br />
            Look the part.
          </h2>
          <p className="font-dm-sans font-light text-sm text-text-secondary mt-3">
            Collagen protein for performance and recovery.
            <br />
            Built for athletes who train hard and recover harder.
          </p>
          <button
            className="btn rounded-full mt-6 mb-10 text-sm font-dm-sans hover:opacity-90 transition-opacity duration-200"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-dark)",
              paddingInline: "1.5rem",
            }}
          >
            Shop Collagen →
          </button>
        </div>

        {/* Interior image — bottom half, sharp, fades into card at top */}
        <div className="relative h-56 overflow-hidden rounded-b-2xl">
          <Image
            src="/images/mission/mission_main.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-bg-dark-secondary) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Product PNG — breaks out of card bottom */}
        <div
          className="absolute -bottom-17.5 md:-bottom-25 left-1/2 -translate-x-1/2 w-40 h-52 md:w-48 md:h-60 z-20"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.75))" }}
        >
          <Image
            src="/images/hero/whey_vanilla.png"
            alt="Probell collagen product"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
