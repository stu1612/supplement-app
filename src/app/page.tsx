// components
import { Hero } from "./components/clients";
import { Goals, Mission } from "./components/servers";

export default function Home() {
  return (
    <main>
      <Hero />
      <Goals />
      <Mission />
    </main>
  );
}
