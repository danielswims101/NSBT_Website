import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { NextStep } from "@/components/site/next-step";
import { Breadcrumb, PageHero, PageWidth } from "@/components/site/page-hero";
import { ProductCard } from "@/components/site/product-card";
import { PublicPage } from "@/components/site/public-pages";
import { productJsonLd } from "@/components/site/jsonld";
import { storePolicyUnpublished } from "@/content/copy";
import { productByHandle, type Product } from "@/content/products";
import { pageMeta } from "@/content/registry";
import { CANONICAL_ORIGIN } from "@/content/site";

const STORE_POLICIES = new Set(["shipping", "returns", "privacy", "terms"]);

type LoaderData =
  | { kind: "policy"; path: string }
  | { kind: "product"; product: Product };

export const Route = createFileRoute("/_site/store/$handle")({
  component: StoreItem,
  loader: ({ params }): LoaderData => {
    if (STORE_POLICIES.has(params.handle)) {
      return { kind: "policy", path: `/store/${params.handle}` };
    }
    const product = productByHandle(params.handle);
    if (!product) throw notFound();
    return { kind: "product", product };
  },
  head: ({ params }) => {
    if (STORE_POLICIES.has(params.handle)) {
      const meta = pageMeta(`/store/${params.handle}`);
      return {
        meta: [
          { title: meta.documentTitle },
          { name: "description", content: meta.description },
        ],
      };
    }
    const product = productByHandle(params.handle);
    return {
      meta: [
        { title: product ? `${product.name} · NSBT Bookstore` : "Bookstore · NSBT" },
        { name: "description", content: product?.description || "The NSBT Bookstore." },
      ],
    };
  },
});

function StoreItem() {
  const data = Route.useLoaderData() as LoaderData;
  if (data.kind === "policy") {
    return <PublicPage path={data.path} />;
  }
  const { product } = data;
  return (
    <>
      <PageHero title={product.name} compact />
      <PageWidth className="pt-8 sm:pt-10">
        <Breadcrumb items={[{ label: "Bookstore", href: "/store" }, { label: product.name }]} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              productJsonLd({
                name: product.name,
                image: product.image,
                price: product.price,
                available: product.available,
                url: `${CANONICAL_ORIGIN}/store/${product.handle}`,
              }),
            ),
          }}
        />
        <div className="mt-10 grid max-w-5xl gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <ProductCard product={product} />
          </div>
          <div className="md:col-span-6 md:pt-4">
            <h2 className="font-display text-[28px] font-medium text-ink">Shipping and returns</h2>
            <p className="mt-4 text-[17px] leading-[1.65]">{storePolicyUnpublished("shipping and returns information")}</p>
            <p className="mt-6 text-[15px]">
              <Link to="/store/shipping" className="underline-offset-4 hover:underline">
                Shipping Policy
              </Link>
              {" · "}
              <Link to="/store/returns" className="underline-offset-4 hover:underline">
                Returns Policy
              </Link>
              {" · "}
              <Link to="/store/privacy" className="underline-offset-4 hover:underline">
                Privacy
              </Link>
              {" · "}
              <Link to="/store/terms" className="underline-offset-4 hover:underline">
                Terms of sale
              </Link>
            </p>
          </div>
        </div>
        <NextStep path="/store" />
      </PageWidth>
    </>
  );
}
