import { createFileRoute } from "@tanstack/react-router";
import { Favorites } from "@/components/pages/Favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved Quotes — EngineerUp" },
      { name: "description", content: "Your collection of motivation and inspiration." },
    ],
  }),
  component: Favorites,
});
