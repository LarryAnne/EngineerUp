import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/components/pages/Notifications";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications | EngineerUp" }, { name: "description", content: "Read your EngineerUp updates and daily student motivation." }, { property: "og:title", content: "Notifications | EngineerUp" }, { property: "og:description", content: "Read your EngineerUp updates and daily student motivation." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
});
