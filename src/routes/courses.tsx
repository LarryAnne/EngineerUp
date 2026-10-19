import { createFileRoute } from "@tanstack/react-router";
import { Courses } from "@/components/pages/Courses";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Course Support Hub — EngineerUp" },
      { name: "description", content: "Navigate your Year One courses with practical tips, common mistakes to avoid, and curated resources." },
      { property: "og:title", content: "Course Support Hub \u2014 EngineerUp" },
      { property: "og:description", content: "Navigate your Year One courses with practical tips, common mistakes to avoid, and curated resources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Courses,
});
