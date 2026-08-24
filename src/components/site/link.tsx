import { Link as RouterLink } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type RouterLinkProps = ComponentProps<typeof RouterLink>;

/** Public pages are served by the `_site/$` splat, so their paths are not in the generated route union. */
export function Link({ to, ...props }: Omit<RouterLinkProps, "to"> & { to: string }) {
  return <RouterLink to={to as never} {...props} />;
}
