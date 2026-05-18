import { createFileRoute } from "@tanstack/react-router";
import { Stories } from "@/components/pages/Stories";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Student Stories — EngineerUp" },
      { name: "description", content: "Real stories of struggle, persistence, and triumph from African engineering students." },
    ],
  }),
  component: Stories,
});
