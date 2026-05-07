import { createFileRoute } from "@tanstack/react-router";
import { Motivation } from "@/components/pages/Motivation";

export const Route = createFileRoute("/motivation")({
  head: () => ({
    meta: [
      { title: "Need a Boost? — EngineerUp" },
      { name: "description", content: "Feeling overwhelmed? Get instant, powerful motivation when you need it most." },
    ],
  }),
  component: Motivation,
});
