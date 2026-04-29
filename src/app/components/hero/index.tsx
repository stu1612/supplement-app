"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type FlavorId = "strawberry" | "blueberry" | "vanilla";

interface Flavor {
  id: FlavorId;
  label: string;
  color: string; // hex — sets --accent on root
  rgb: string;   // "R, G, B" — sets --accent-rgb on root
  image: string;
}

const flavors: Flavor[] = [
  {
    id: "strawberry",
    label: "Strawberry",
    color: "#C0392B",
    rgb: "192, 57, 43",
    image: "/images/hero/whey_strawberry.png",
  },
  {
    id: "blueberry",
    label: "Blueberry",
    color: "#2D3A9E",
    rgb: "45, 58, 158",
    image: "/images/hero/whey_blueberry.png",
  },
  {
    id: "vanilla",
    label: "Vanilla",
    color: "#C9A84C",
    rgb: "201, 168, 76",
    image: "/images/hero/whey_vanilla.png",
  },
];

const flavorBgClass: Record<FlavorId, string> = {
  strawberry: "bg-strawberry",
  blueberry: "bg-blueberry",
  vanilla: "bg-vanilla",
};

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function rangeProgress(p: number, start: number, end: number) {
  return clamp((p - start) / (end - start), 0, 1);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const stats = [
  { value: "25g", label: "Protein" },
  { value: "2lb", label: "Weight" },
  { value: "0g", label: "Gluten" },
];

interface AnimState {
  headlineOpacity: number;
  hintOpacity: number;
  kettlebellY: number;
  statsOpacity: number;
  flavorOpacity: number;
  flavorY: number;
  progressBarHeight: number;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFlavor, setActiveFlavor] = useState<FlavorId>("strawberry");
  const [anim, setAnim] = useState<AnimState>({
    headlineOpacity: 1,
    hintOpacity: 1,
    kettlebellY: 500,
    statsOpacity: 0,
    flavorOpacity: 0,
    flavorY: 20,
    progressBarHeight: 0,
  });

  const flavor = flavors.find((f) => f.id === activeFlavor)!;

  // Sync --accent and --accent-rgb with active flavor
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", flavor.color);
    root.style.setProperty("--accent-rgb", flavor.rgb);
  }, [flavor]);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / scrollable, 0, 1);
      const initialKbY = Math.round(window.innerHeight * 0.58);
      setAnim({
        headlineOpacity: lerp(1, 0, rangeProgress(p, 0, 0.45)),
        hintOpacity: lerp(1, 0, rangeProgress(p, 0, 0.2)),
        kettlebellY: lerp(initialKbY, 0, rangeProgress(p, 0.1, 0.8)),
        statsOpacity: lerp(0, 1, rangeProgress(p, 0.55, 0.75)),
        flavorOpacity: lerp(0, 1, rangeProgress(p, 0.6, 0.95)),
        flavorY: lerp(20, 0, rangeProgress(p, 0.6, 0.95)),
        progressBarHeight: p * 100,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="h-[200vh] bg-bg-dark">
      <div className="sticky top-0 h-screen overflow-hidden isolate">

        {/* Ambient background */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/images/hero/hero_gym_bg.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-35"
          />
          {/* Vignette — references bg-dark token, Tailwind can't compute this */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 20%, var(--color-bg-dark) 65%)" }}
          />
        </div>

        {/* Left scroll progress bar */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-text-primary/8 z-10">
          <div
            className="bg-text-primary/30"
            style={{ height: `${anim.progressBarHeight}%` }}
          />
        </div>

        {/* Headline */}
        <div
          className="absolute top-[15%] left-0 right-0 text-center px-8 z-10"
          style={{ opacity: anim.headlineOpacity }}
        >
          <h1 className="font-condensed text-[clamp(3.5rem,8vw,4.5rem)] font-black uppercase tracking-[-1px] leading-none text-text-primary">
            THIS IS NOT A{" "}
            <span style={{ color: "var(--accent)" }}>KETTLEBELL.</span>
          </h1>
          <p className="mt-4 font-dm-sans text-[clamp(0.875rem,2vw,1rem)] font-light text-text-primary/30 tracking-[0.02em]">
            It&apos;s protein.
          </p>
        </div>

        {/* Kettlebell + color glow */}
        <div
          className="absolute top-1/2 left-1/2 w-90 h-120 z-[5]"
          style={{ transform: `translate(-50%, calc(-50% + ${anim.kettlebellY}px))` }}
        >
          {/* Glow — flavor-reactive via --accent-rgb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-[background] duration-500 ease-in-out"
            style={{ background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.45) 0%, transparent 70%)" }}
          />
          <Image
            src={flavor.image}
            alt={`Probell ${flavor.label} kettlebell`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Desktop flavor chips — left of kettlebell */}
        <div
          className="hidden md:flex md:flex-col absolute left-[20%] top-1/2 gap-3.5 z-10"
          style={{
            opacity: anim.flavorOpacity,
            transform: `translateY(calc(-50% + ${anim.flavorY}px))`,
            pointerEvents: anim.flavorOpacity > 0.05 ? "auto" : "none",
          }}
        >
          {flavors.map((f) => {
            const isActive = f.id === activeFlavor;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFlavor(f.id)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span
                  className={`block w-9 h-9 rounded-full border-2 transition-all duration-200 ${flavorBgClass[f.id]} ${
                    isActive ? "border-text-primary/90 scale-[1.18]" : "border-text-primary/12"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 0 0 2.5px var(--accent), 0 0 18px rgba(var(--accent-rgb), 0.56)"
                      : "none",
                  }}
                />
                <span
                  className={`font-dm-sans text-xs font-medium tracking-[0.5px] transition-colors duration-200 ${
                    isActive ? "text-text-primary" : "text-text-primary/60"
                  }`}
                >
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          style={{ opacity: anim.hintOpacity }}
        >
          <span className="font-dm-sans text-[0.625rem] font-medium uppercase tracking-[3px] text-text-primary/40">
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-text-primary/40 animate-[hero-bounce_1.4s_ease-in-out_infinite]"
          >
            <path
              d="M8 3L8 13M8 13L3 8M8 13L13 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Stats — desktop right column */}
        <div
          className="hidden md:flex md:flex-col absolute right-[20%] top-1/2 -translate-y-1/2 gap-8 z-10"
          style={{ opacity: anim.statsOpacity }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-right">
              <div className="font-condensed text-[2rem] font-black leading-none text-text-primary">
                {value}
              </div>
              <div className="font-dm-sans text-[0.625rem] font-medium uppercase tracking-[3px] text-text-primary/40 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Stats — mobile horizontal row */}
        <div
          className="flex md:hidden absolute top-[10%] left-0 right-0 justify-center gap-10 z-10"
          style={{ opacity: anim.statsOpacity }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-condensed text-[clamp(1.5rem,6vw,2rem)] font-black leading-none text-text-primary">
                {value}
              </div>
              <div className="font-dm-sans text-[0.5rem] font-medium uppercase tracking-[3px] text-text-primary/40 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Flavor panel — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pt-16 px-8 pb-10 z-10"
          style={{
            background: "linear-gradient(to top, var(--color-bg-dark) 60%, transparent)",
            opacity: anim.flavorOpacity,
            transform: `translateY(${anim.flavorY}px)`,
            pointerEvents: anim.flavorOpacity > 0.05 ? "auto" : "none",
          }}
        >
          <div className="max-w-[480px] mx-auto flex flex-col items-center gap-5">

            {/* Mobile-only pill buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:hidden">
              {flavors.map((f) => {
                const isActive = f.id === activeFlavor;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFlavor(f.id)}
                    className={`font-dm-sans text-xs font-medium tracking-[0.5px] rounded-full py-2 px-[1.125rem] border transition-all duration-200 ${
                      isActive ? "" : "border-text-primary/20 text-text-primary/50"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: "var(--accent)",
                            background: "rgba(var(--accent-rgb), 0.2)",
                            color: "var(--color-text-primary)",
                          }
                        : undefined
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Urgency line */}
            <p className="font-dm-sans font-normal text-[11px] uppercase tracking-[2px] text-accent text-center">
              Limited First Drop · First 1,000 Units Only
            </p>

            {/* CTA — flavor reactive via --accent */}
            <button
              className="btn w-full max-w-[300px] text-text-primary transition-[background] duration-300"
              style={{ background: "var(--accent)" }}
            >
              Add to Cart
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
