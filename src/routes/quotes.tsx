import { createFileRoute } from "@tanstack/react-router";
import { Quotes } from "@/components/pages/Quotes";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Motivational Quotes — EngineerUp" },
      { name: "description", content: "Find inspiration that speaks to your struggle. Browse motivational quotes for engineering students." },
      { property: "og:title", content: "Motivational Quotes \u2014 EngineerUp" },
      { property: "og:description", content: "Find inspiration that speaks to your struggle. Browse motivational quotes for engineering students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Quotes,
});
