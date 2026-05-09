import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/components/pages/Profile";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile | EngineerUp" }] }),
});
