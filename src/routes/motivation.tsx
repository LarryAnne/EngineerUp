import { createFileRoute } from "@tanstack/react-router";
import { Motivation } from "@/components/pages/Motivation";

export const Route = createFileRoute("/motivation")({
  head: () => ({
    meta: [
      { title: "Need a Boost? — EngineerUp" },
      { name: "description", content: "Feeling overwhelmed? Get instant, powerful motivation when you need it most." },
      { property: "og:title", content: "Need a Boost? \u2014 EngineerUp" },
      { property: "og:description", content: "Feeling overwhelmed? Get instant, powerful motivation when you need it most." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Motivation,
});
