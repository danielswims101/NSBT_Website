import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/students")({
  beforeLoad: () => {
    throw redirect({ href: "/login" });
  },
});
