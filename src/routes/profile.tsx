import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/components/pages/Profile";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile | EngineerUp" }, { name: "description", content: "Manage your EngineerUp student profile and account." }, { property: "og:title", content: "Profile | EngineerUp" }, { property: "og:description", content: "Manage your EngineerUp student profile and account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
});
