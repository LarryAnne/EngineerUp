import { createFileRoute } from "@tanstack/react-router";
import { Signup } from "@/components/pages/Signup";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Sign up | EngineerUp" }, { name: "description", content: "Join EngineerUp for daily motivation and practical support for African engineering students." }, { property: "og:title", content: "Sign up | EngineerUp" }, { property: "og:description", content: "Join EngineerUp for daily motivation and practical support for African engineering students." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
});
