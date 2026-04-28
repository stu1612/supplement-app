Read docs/features/goals-section.md for full context.

The following edits are required to the card component only.
Do not change anything outside the card component.

---

CARD HOVER BEHAVIOUR — SWAP NOT STACK

Resting state:

- Title visible — bottom-left, large, bold
- Description hidden
- CTA hidden

On hover:

- Title fades out: opacity-100 → opacity-0, translate-y-2
- Description fades in: opacity-0 → opacity-100, translate-y-4 → translate-y-0
- CTA fades in beneath description
- All transitions: duration-500 ease-in-out

---

TEXT LEGIBILITY

Apply to title and description:
text-shadow: 0 2px 8px rgba(0,0,0,0.8)

Text colour: white on all states. Do not use black text.

---

RECOMMENDATION CTA — PILL STYLE

- Label: "Recommendation →"
- Style: pill — rounded-full, px-4 py-2, text-sm font-medium
- Resting: white border, transparent background, white text
- Hover on pill: white background, black text
- Border: border border-white

---

MOBILE

- Overlay gradient opacity increased to 0.85 from bottom
- Spacing between title, body, CTA: gap-6 minimum
- Text shadow applied consistently
- CTA pill always visible on mobile
- All text white with text-shadow

---

Build and test in the features playground first.
Do not touch the production component until confirmed working.
