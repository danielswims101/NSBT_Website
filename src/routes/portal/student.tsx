import { createFileRoute } from "@tanstack/react-router";
import { CampusHub } from "@/components/campus/campus-hub";
import { PortalGate } from "@/components/campus/portal-gate";
import { writeCampusRole } from "@/lib/campus";

export const Route = createFileRoute("/portal/student")({
  component: StudentCampus,
  head: () => ({ meta: [{ title: "Student campus · NSBT" }] }),
});

function StudentCampus() {
  if (typeof window !== "undefined") writeCampusRole("student");
  return <PortalGate>{(user, role) => <CampusHub user={user} role={role} />}</PortalGate>;
}
