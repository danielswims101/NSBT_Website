import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { JsonLd } from "@/components/site/jsonld";
import { NotFoundPage } from "@/components/site/not-found";
import { SitePrefsProvider } from "@/components/site/site-prefs";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
  notFoundComponent: NotFoundPage,
});

function SiteLayout() {
  return (
    <SitePrefsProvider>
      <div className="flex min-h-dvh flex-col bg-paper text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </SitePrefsProvider>
  );
}
