import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav, secondaryNav } from "@/content/site";
import { Button } from "./button";
import { Wordmark } from "./seal";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function closeMenu() {
    setOpen(false);
    setOpenSection(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link
          to="/"
          aria-label="The New School of Biblical Theology"
          className="inline-flex min-h-11 min-w-0 shrink items-center"
        >
          <Wordmark />
        </Link>

        {/* Desktop: two stacked rows on the right, like nsbt.org */}
        <div className="hidden flex-col items-end gap-2.5 lg:flex">
          <div className="flex items-center gap-6">
            {secondaryNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-seal"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-seal"
            >
              Log in
            </Link>
          </div>

          <nav className="flex items-stretch gap-0.5" aria-label="Primary">
            {primaryNav.map((item) => {
              const current =
                item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              return (
                <div key={item.href} className="group relative flex">
                  <Link
                    to={item.href}
                    data-current={current ? "true" : undefined}
                    className="relative inline-flex items-center px-3 py-1 text-[12.5px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-seal data-[current=true]:text-seal"
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 bottom-0 h-[2px] bg-seal transition-opacity ${current ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      aria-hidden="true"
                    />
                  </Link>
                  {item.children ? (
                    <div className="absolute top-full left-0 z-50 hidden min-w-72 border border-rule border-t-2 border-t-seal bg-cream py-2 shadow-[var(--shadow-lift)] group-hover:block">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-5 py-2.5 text-[13px] text-ink/85 hover:bg-paper hover:text-seal"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Button asChild size="sm" className="ml-2 focus-visible:ring-offset-cream">
              <Link to="/admissions/apply">Apply Now</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid size-11 place-items-center text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => {
            if (open) closeMenu();
            else setOpen(true);
          }}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-rule bg-cream px-4 py-2 lg:hidden">
          <nav aria-label="Mobile">
            <ul>
              {primaryNav.map((item) => {
                const expanded = openSection === item.href;
                const children = (item.children ?? []).filter((child) => child.href !== item.href);
                return (
                  <li key={item.href} className="border-b border-rule/80">
                    <div className="flex items-stretch">
                      <Link
                        to={item.href}
                        className="flex min-h-12 flex-1 items-center text-[15px] uppercase tracking-[0.1em] text-ink"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                      {children.length > 0 ? (
                        <button
                          type="button"
                          className="grid size-12 place-items-center text-ink"
                          aria-expanded={expanded}
                          aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                          onClick={() => setOpenSection(expanded ? null : item.href)}
                        >
                          <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                        </button>
                      ) : null}
                    </div>
                    {expanded
                      ? children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="flex min-h-11 items-center pl-4 text-[14px] text-ink/80"
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </li>
                );
              })}
              {secondaryNav.map((item) => (
                <li key={item.href} className="border-b border-rule/80">
                  <Link
                    to={item.href}
                    className="flex min-h-12 items-center text-[15px] uppercase tracking-[0.1em] text-ink"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="flex min-h-12 items-center text-[15px] uppercase tracking-[0.1em] text-ink"
                  onClick={closeMenu}
                >
                  Log in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
