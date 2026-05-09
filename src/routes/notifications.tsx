import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/components/pages/Notifications";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications | EngineerUp" }] }),
});
