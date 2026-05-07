import { createFileRoute } from "@tanstack/react-router";
import { Challenge } from "@/components/pages/Challenge";

export const Route = createFileRoute("/challenge")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — EngineerUp" },
      { name: "description", content: "Small, consistent actions lead to massive results. Take today's challenge." },
    ],
  }),
  component: Challenge,
});
