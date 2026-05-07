import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — EngineerUp" },
      { name: "description", content: "Built by students, for students. Meet the team behind EngineerUp." },
    ],
  }),
  component: About,
});
