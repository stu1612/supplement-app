"use client";

import { useRef, useEffect, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function rangeProgress(p: number, start: number, end: number) {
  return clamp((p - start) / (end - start), 0, 1);
}

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState({ line1: 0, line2: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / scrollable, 0, 1);

      setOpacity({
        line1: clamp(
          rangeProgress(p, 0, 0.25) - rangeProgress(p, 0.35, 0.5),
          0,
          1,
        ),
        line2: rangeProgress(p, 0.5, 0.65),
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mission-parallax-bg h-[150vh] w-full relative"
    >
      <div className="mission-overlay absolute inset-0" />
      <div
        className="sticky top-0 h-screen flex items-center justify-center z-10"
        style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.7)" }}
      >
        <div className="grid w-[90%] max-w-[760px] text-center">
          <p
            className="[grid-area:1/1] font-condensed font-black uppercase tracking-tight leading-tight text-text-primary text-[clamp(1.75rem,4vw,3.5rem)]"
            style={{
              opacity: opacity.line1,
              transition: "opacity 300ms ease",
              textShadow: "0 4px 24px rgba(0,0,0,0.9)",
            }}
          >
            We didn&apos;t build a{" "}
            <span className="text-accent">supplement</span> that looks like a{" "}
            <span className="text-accent">kettlebell</span>.
          </p>
          <p
            className="[grid-area:1/1] font-condensed font-black uppercase tracking-tight leading-tight text-text-primary text-[clamp(1.75rem,4vw,3.5rem)]"
            style={{
              opacity: opacity.line2,
              transition: "opacity 300ms ease",
              textShadow: "0 4px 24px rgba(0,0,0,0.9)",
            }}
          >
            We built a <span className="text-accent">kettlebell</span> that
            works like a <span className="text-accent">supplement</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
