import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress Dashboard — EngineerUp" },
      { name: "description", content: "Track your journey and celebrate your wins. View your study streak, completed tasks, and progress." },
      { property: "og:title", content: "Progress Dashboard \u2014 EngineerUp" },
      { property: "og:description", content: "Track your journey and celebrate your wins. View your study streak, completed tasks, and progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});
