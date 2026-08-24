import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCurrentUserState, type AppUser } from "@/lib/auth/use-current-user";
import { readCampusRole, type CampusRole } from "@/lib/campus";
import { PortalShell } from "./portal-shell";

export function PortalGate({ children }: { children: (user: AppUser, role: CampusRole) => ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const role = readCampusRole();

  if (isPending) {
    return (
      <div className="grid min-h-dvh place-items-center bg-paper text-muted">Opening the campus…</div>
    );
  }
  if (!user) {
    return <Navigate to={role === "faculty" ? "/signin/faculty" : "/signin/students"} />;
  }

  return (
    <PortalShell user={user} role={role}>
      {children(user, role)}
    </PortalShell>
  );
}
