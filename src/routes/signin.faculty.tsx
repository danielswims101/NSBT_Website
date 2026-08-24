import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/faculty")({
  beforeLoad: () => {
    throw redirect({ href: "/login" });
  },
});
