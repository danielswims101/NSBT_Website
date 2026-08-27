import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PublicPage } from "@/components/site/public-pages";
import { pageMeta, pages } from "@/content/registry";
import { products } from "@/content/products";
import { CANONICAL_ORIGIN } from "@/content/site";

// Per-section social share cards in public/og/. Keyed by first path segment,
// with a couple of full-path overrides. Pages without a card inherit the
// site-wide og.jpg from __root.
const OG_CARDS: Record<string, string> = {
  about: "/og/about.png",
  academics: "/og/academics.png",
  admissions: "/og/admissions.png",
  alumni: "/og/alumni.png",
  store: "/og/bookstore.png",
  contact: "/og/contact.png",
};
const OG_CARD_OVERRIDES: Record<string, string> = {
  "/about/accreditation": "/og/accreditation.png",
};

function ogCardFor(path: string): string | null {
  if (OG_CARD_OVERRIDES[path]) return OG_CARD_OVERRIDES[path];
  const segment = path.split("/")[1] ?? "";
  return OG_CARDS[segment] ?? null;
}

const extra = new Set([
  "/about/advisory/jamaal",
  "/about/advisory/hernandez",
  "/about/advisory/spears",
  "/about/trustees/weiss",
  "/about/trustees/halek",
  "/academics/faculty/chaparro",
  "/academics/faculty/irvin",
  "/academics/faculty/white",
]);

function pathFromSplat(splat: string | undefined) {
  return "/" + (splat ?? "");
}

export const Route = createFileRoute("/_site/$")({
  component: SplatPage,
  head: ({ params }) => {
    const path = pathFromSplat(params._splat);
    const meta = pageMeta(path);
    const url = `${CANONICAL_ORIGIN}${path}`;
    const card = ogCardFor(path);
    return {
      meta: [
        { title: meta.documentTitle },
        { name: "description", content: meta.description },
        // Per-page Open Graph, overriding the site-wide defaults in __root.
        { property: "og:title", content: meta.metaTitle ?? meta.documentTitle },
        { property: "og:description", content: meta.description },
        { property: "og:url", content: url },
        ...(card
          ? [
              { property: "og:image", content: `${CANONICAL_ORIGIN}${card}` },
              { name: "twitter:image", content: `${CANONICAL_ORIGIN}${card}` },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }): { path: string } => {
    const path = pathFromSplat(params._splat);
    if (path === "/registrar") throw redirect({ href: "/students/records" });
    if (path === "/apply") throw redirect({ href: "/admissions/apply" });
    // Program pages moved to their fixed public addresses (cited by institutional documents).
    if (path === "/academics/degrees") throw redirect({ href: "/programs" });
    if (path === "/academics/degrees/macm") throw redirect({ href: "/programs/macm" });
    if (path === "/academics/degrees/magl") throw redirect({ href: "/programs/magl" });
    if (path === "/admissions/tuition") throw redirect({ href: "/tuition" });
    if (path === "/signin.students") throw redirect({ href: "/login" });
    if (path === "/signin.faculty") throw redirect({ href: "/login" });
    const storeItem = path.startsWith("/store/") ? path.slice("/store/".length) : null;
    const known =
      path in pages ||
      extra.has(path) ||
      (storeItem != null && products.some((p) => p.handle === storeItem));
    if (!known) throw notFound();
    return { path };
  },
});

function SplatPage() {
  const data = Route.useLoaderData() as { path: string };
  return <PublicPage path={data.path} />;
}
