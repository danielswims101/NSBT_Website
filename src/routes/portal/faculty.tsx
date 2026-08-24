import { createFileRoute } from "@tanstack/react-router";
import { CampusHub } from "@/components/campus/campus-hub";
import { PortalGate } from "@/components/campus/portal-gate";
import { writeCampusRole } from "@/lib/campus";

export const Route = createFileRoute("/portal/faculty")({
  component: FacultyCampus,
  head: () => ({ meta: [{ title: "Faculty campus · NSBT" }] }),
});

function FacultyCampus() {
  if (typeof window !== "undefined") writeCampusRole("faculty");
  return <PortalGate>{(user, role) => <CampusHub user={user} role={role} />}</PortalGate>;
}
