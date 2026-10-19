import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EngineerUp — Engineering is Hard. Staying Motivated Shouldn't Be." },
      { name: "description", content: "Built for African Year One software engineering students. Real stories, practical advice, and daily motivation to help you succeed." },
      { property: "og:title", content: "EngineerUp" },
      { property: "og:description", content: "Empowering African software engineering students with realistic motivation and practical guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});
