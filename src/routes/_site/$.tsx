import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PublicPage } from "@/components/site/public-pages";
import { pageMeta, pages } from "@/content/registry";
import { products } from "@/content/products";

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
    return {
      meta: [
        { title: meta.documentTitle },
        { name: "description", content: meta.description },
      ],
    };
  },
  loader: ({ params }): { path: string } => {
    const path = pathFromSplat(params._splat);
    if (path === "/registrar") throw redirect({ href: "/students/records" });
    if (path === "/apply") throw redirect({ href: "/admissions/apply" });
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
