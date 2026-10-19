import { createFileRoute } from "@tanstack/react-router";
import { Favorites } from "@/components/pages/Favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved Quotes — EngineerUp" },
      { name: "description", content: "Your collection of motivation and inspiration." },
      { property: "og:title", content: "Saved Quotes \u2014 EngineerUp" },
      { property: "og:description", content: "Your collection of motivation and inspiration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Favorites,
});
