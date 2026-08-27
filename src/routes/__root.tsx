import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { CANONICAL_ORIGIN } from "@/content/site";
import appCss from "../styles.css?url";

const APP_NAME = "The New School of Biblical Theology";
const DESCRIPTION =
  "Two graduate degrees taught entirely online. NSBT prepares men and women for Christian ministry and leadership in a global context.";
// 1200×630 social share card served from public/og.jpg.
const OG_IMAGE = `${CANONICAL_ORIGIN}/og.jpg`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0e1a2b" },
      { name: "description", content: DESCRIPTION },
      { name: "apple-mobile-web-app-title", content: "NSBT" },
      // Open Graph — how the real nsbt.org looks when shared (Facebook, iMessage,
      // LinkedIn, Slack). Site-wide defaults; individual routes may override.
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL_ORIGIN },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // Twitter/X large card.
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_ORIGIN },
      // BASE_URL is "/" locally and "/NSBT_Website/" on GitHub Pages, so these
      // static assets resolve under whatever subpath the site is served from.
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
      { rel: "icon", type: "image/png", href: `${import.meta.env.BASE_URL}favicon.png` },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}manifest.webmanifest` },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-fg">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
