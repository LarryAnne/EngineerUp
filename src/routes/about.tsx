import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — EngineerUp" },
      { name: "description", content: "Built by students, for students. Meet the team behind EngineerUp." },
      { property: "og:title", content: "About \u2014 EngineerUp" },
      { property: "og:description", content: "Built by students, for students. Meet the team behind EngineerUp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});
