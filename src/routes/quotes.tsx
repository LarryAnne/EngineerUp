import { createFileRoute } from "@tanstack/react-router";
import { Quotes } from "@/components/pages/Quotes";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title: "Motivational Quotes — EngineerUp" },
      { name: "description", content: "Find inspiration that speaks to your struggle. Browse motivational quotes for engineering students." },
    ],
  }),
  component: Quotes,
});
