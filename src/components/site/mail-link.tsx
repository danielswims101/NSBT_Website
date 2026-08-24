import type { ReactNode } from "react";
import { STUDENT_EMAIL } from "@/content/site";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

/** Cloudflare Email Address Obfuscation skips markup inside <!--email_off-->. */
export function MailLink({
  email = STUDENT_EMAIL,
  className = "underline-offset-4 hover:underline",
  href,
  children,
}: {
  email?: string;
  className?: string;
  href?: string;
  children?: ReactNode;
}) {
  const target = href ?? `mailto:${email}`;
  const label = typeof children === "string" || children == null ? String(children ?? email) : null;
  if (label != null) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--email_off--><a class="${escapeHtml(className)}" href="${escapeHtml(target)}">${escapeHtml(label)}</a><!--/email_off-->`,
        }}
      />
    );
  }
  return (
    <a className={className} href={target}>
      {children}
    </a>
  );
}

export function EmailText({ email = STUDENT_EMAIL }: { email?: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${escapeHtml(email)}<!--/email_off-->`,
      }}
    />
  );
}
