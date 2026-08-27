import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/content/site";
import { Button } from "./button";
import { Wordmark } from "./seal";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = primaryNav.filter((item) => item.label !== "Apply");

  function closeMenu() {
    setOpen(false);
    setOpenSection(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-cream">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-[4.75rem] lg:px-6">
        <Link to="/" aria-label="The New School of Biblical Theology" className="inline-flex min-h-11 min-w-0 shrink items-center">
          <Wordmark />
        </Link>
        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const current =
              item.href !== "/" && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <div key={item.href} className="group relative flex">
                <Link
                  to={item.href}
                  data-current={current ? "true" : undefined}
                  className="relative inline-flex items-center px-3.5 text-[12.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-seal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream data-[current=true]:text-seal"
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 bottom-0 h-[2px] bg-seal transition-opacity ${current ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    aria-hidden="true"
                  />
                </Link>
                {item.children ? (
                  <div className="invisible absolute top-full left-0 z-50 min-w-72 border border-rule border-t-2 border-t-seal bg-cream py-2 opacity-0 shadow-[var(--shadow-lift)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-5 py-2.5 text-[15px] text-ink/80 hover:bg-paper hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center px-2 text-[14px] text-ink/80 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:text-[15px]"
          >
            Log in
          </Link>
          <Button asChild size="sm" className="focus-visible:ring-offset-cream">
            <Link to="/admissions/apply">Apply</Link>
          </Button>
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
      </div>
      {open ? (
        <div className="border-t border-rule bg-cream px-4 py-2 lg:hidden">
          <nav aria-label="Mobile">
            <ul>
              {nav.map((item) => {
                const expanded = openSection === item.href;
                const children = (item.children ?? []).filter((child) => child.href !== item.href);
                return (
                  <li key={item.href} className="border-b border-rule/80">
                    <div className="flex items-stretch">
                      <Link
                        to={item.href}
                        className="flex min-h-12 flex-1 items-center text-[16px] text-ink"
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
                            className="flex min-h-11 items-center pl-4 text-[15px] text-ink/80"
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        ))
                      : null}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
