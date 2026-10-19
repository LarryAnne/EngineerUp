import { createFileRoute } from "@tanstack/react-router";
import { Stories } from "@/components/pages/Stories";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Student Stories — EngineerUp" },
      { name: "description", content: "Real stories of struggle, persistence, and triumph from African engineering students." },
      { property: "og:title", content: "Student Stories \u2014 EngineerUp" },
      { property: "og:description", content: "Real stories of struggle, persistence, and triumph from African engineering students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Stories,
});
