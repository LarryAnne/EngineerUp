import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/components/pages/Login";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in | EngineerUp" }, { name: "description", content: "Sign in to your EngineerUp account to access your saved quotes and progress." }, { property: "og:title", content: "Sign in | EngineerUp" }, { property: "og:description", content: "Sign in to your EngineerUp account to access your saved quotes and progress." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
});
