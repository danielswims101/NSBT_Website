import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { readCampusRole } from "@/lib/campus";

export const Route = createFileRoute("/portal/")({
  component: PortalIndex,
  head: () => ({ meta: [{ title: "Campus · NSBT" }] }),
});

function PortalIndex() {
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
  return <Navigate to={role === "faculty" ? "/portal/faculty" : "/portal/student"} />;
}
