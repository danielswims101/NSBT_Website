import { useState } from "react";
import { Link } from "@/components/site/link";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "./button";
import { Seal } from "./seal";
import { writeCampusRole } from "@/lib/campus";

const google = GROK_PROVIDERS.find((p) => p.idp === "google");

export function SignInPanel({
  role,
  title,
  lede,
  destination,
}: {
  role: "student" | "faculty";
  title: string;
  lede: string;
  destination: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function start() {
    if (!google || !authEnabled) return;
    setError(null);
    setPending(true);
    try {
      writeCampusRole(role);
      await signIn(google.providerId, { callbackURL: destination, errorCallbackURL: destination });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
      setPending(false);
    }
  }

  return (
    <div className="grid min-h-dvh bg-ink lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={role === "faculty" ? "/images/people/bernard-teaching.jpg" : "/images/people/bernard-teaching-nsbt.jpg"}
          alt="The Rev. Dr. A. R. Bernard, Sr."
          data-provenance="REAL"
          className="absolute inset-0 size-full object-cover object-[center_14%]"
        />
      </div>
      <div className="flex flex-col justify-center bg-paper px-6 py-16 sm:px-12">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-ink">
          <Seal className="h-10" />
          <span className="font-display text-2xl">NSBT</span>
        </Link>
        <p className="text-[0.7rem] tracking-[0.2em] text-subtle uppercase">
          {role === "faculty" ? "Faculty & Staff" : "Students"}
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink">{title}</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{lede}</p>
        <div className="mt-8 max-w-sm space-y-3">
          {authEnabled && google ? (
            <Button type="button" className="w-full" size="lg" disabled={pending} onClick={() => void start()}>
              {pending ? "Opening Google…" : "Continue with Google Workspace"}
            </Button>
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled in this environment.</p>
          )}
          {error ? <p className="text-sm text-seal">{error}</p> : null}
          <p className="text-xs leading-relaxed text-subtle">
            Access is limited to @nsbt.org accounts issued by the school.
          </p>
        </div>
        <p className="mt-10 text-sm text-muted">
          {role === "faculty" ? (
            <>
              A student?{" "}
              <Link to="/signin/students" className="text-ink underline-offset-4 hover:underline">
                Student sign in
              </Link>
            </>
          ) : (
            <>
              Faculty or staff?{" "}
              <Link to="/signin/faculty" className="text-ink underline-offset-4 hover:underline">
                Faculty & staff
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
