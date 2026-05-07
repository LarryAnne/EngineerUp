import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Progress Dashboard — EngineerUp" },
      { name: "description", content: "Track your journey and celebrate your wins. View your study streak, completed tasks, and progress." },
    ],
  }),
  component: Dashboard,
});
