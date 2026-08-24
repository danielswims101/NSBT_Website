import { createFileRoute, redirect } from "@tanstack/react-router";

/** Campus preview is not a public product. Visitors use /login. */
export const Route = createFileRoute("/portal")({
  beforeLoad: () => {
    throw redirect({ href: "/login" });
  },
});
