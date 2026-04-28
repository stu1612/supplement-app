import Image from "next/image";
import Link from "next/link";

interface Card {
  id: string;
  heading: string;
  description: string;
  body: string;
  route: string;
  image: string;
}

const cards: Card[] = [
  {
    id: "strength",
    heading: "Strength",
    description: "Push harder. Build more.",
    body: "Supporting the serious athlete with clean whey protein built for compound lifts and heavy sessions.",
    route: "/supplements/whey-protein",
    image: "/images/goals/probell_strength.jpg",
  },
  {
    id: "energy",
    heading: "Energy",
    description: "Ignite every session.",
    body: "Clean energy when it matters most. No crash. No jitters. Just fuel that performs as hard as you do.",
    route: "/supplements/pre-workout",
    image: "/images/goals/probell_energy.jpg",
  },
  {
    id: "recovery",
    heading: "Recovery",
    description: "Come back stronger.",
    body: "The fastest way back to peak performance. Creatine that works as hard as you do, every single session.",
    route: "/supplements/creatine-cola",
    image: "/images/goals/probell_recovery.jpg",
  },
];

export default function Goals() {
  return (
    <section className="bg-white py-24 min-h-screen flex items-center">
      <div className="container ">
        <div className="flex flex-col items-center gap-4 text-center pb-12">
          <h2 className="font-condensed text-[clamp(2.5rem,6vw,4rem)] font-black uppercase text-black leading-none">
            Every rep. Every goal. One brand.
          </h2>
          <p className="font-dm-sans font-light text-[clamp(1rem,2vw,1.25rem)] text-black/50 max-w-xl">
            Whether you&apos;re building strength, chasing energy, or
            accelerating recovery — Probell is built around how you train.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden cursor-pointer aspect-[4/5] rounded-xl md:rounded-none md:hover:rounded-xl transition-[border-radius] duration-500 ease-in-out"
            >
              <Image
                src={card.image}
                alt={card.heading}
                fill
                className="object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-500 ease-in-out"
              />
              {/* Overlay A — dark gradient */}
              {/* <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_40%,transparent)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-in-out" /> */}
              {/* Overlay B — red/amber tint gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(180,60,20,0.85)_0%,rgba(200,100,20,0.4)_50%,transparent_100%)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="absolute inset-0 flex flex-col justify-end items-start text-left gap-6 p-6">
                {/* Title — top of stack on mobile, bottom on desktop. Fades out on desktop hover. */}
                <h3
                  className="order-first md:order-last font-condensed text-2xl font-black uppercase text-white leading-none transition-all duration-500 ease-in-out md:group-hover:opacity-0 md:group-hover:translate-y-2"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                >
                  {card.heading}
                </h3>
                {/* Description + CTA — below title on mobile, above on desktop. Fades in on desktop hover. */}
                <div className="order-last md:order-first flex flex-col gap-4 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <p
                    className="font-dm-sans font-bold text-white line-clamp-2"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {card.description}
                  </p>
                  <p
                    className="font-dm-sans font-light text-white line-clamp-3"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {card.body}
                  </p>
                  <Link
                    href={card.route}
                    className="self-start font-dm-sans text-sm font-medium text-white rounded-full px-4 py-2 border border-white bg-transparent hover:bg-white hover:text-black transition-colors duration-200 ease-in-out"
                  >
                    Recommendation →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
