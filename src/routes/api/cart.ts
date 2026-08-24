import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/content/products";

const SHOP = "https://279b96-ad.myshopify.com";

export const Route = createFileRoute("/api/cart")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const v = url.searchParams.get("v") ?? "";
        const known = products.some((p) => p.variants.some((opt) => opt.id === v && opt.available));
        if (!known) return new Response("Not found", { status: 404 });
        return new Response(null, {
          status: 302,
          headers: { Location: `${SHOP}/cart/${encodeURIComponent(v)}:1` },
        });
      },
    },
  },
});
