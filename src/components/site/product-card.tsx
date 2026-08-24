import { useState } from "react";
import { Link } from "@/components/site/link";
import { checkoutNote } from "@/content/copy";
import { cartUrl, formatPrice, type Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, quiet = false }: { product: Product; quiet?: boolean }) {
  const first = product.variants.find((v) => v.available) ?? product.variants[0];
  const [variantId, setVariantId] = useState(first?.id ?? "");
  const variant = product.variants.find((v) => v.id === variantId);
  const available = variant?.available && product.available !== false ? variant?.available : product.available;
  const isBook = product.section === "books";

  return (
    <article className="flex flex-col">
      <Link to={`/store/${product.handle}`} className="block">
        <div className={cn("overflow-hidden bg-paper-deep", quiet ? "aspect-[4/5]" : "aspect-square")}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              data-provenance={isBook ? "REAL" : "GENERATED"}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="grid h-full place-items-center px-6 text-center text-[13px] text-muted">
              Photograph to follow
            </div>
          )}
        </div>
        <h3
          className={cn(
            "mt-4 font-display font-medium text-ink hover:underline",
            quiet ? "text-[18px] leading-snug sm:text-[21px]" : "text-[21px] sm:text-[28px]",
          )}
        >
          {product.name}
        </h3>
      </Link>
      <p className="mt-1 text-[15px] tabular-nums text-fg/80">{formatPrice(product.price)}</p>
      {!available ? (
        <p className="mt-3 inline-flex min-h-11 items-center border border-rule bg-cream px-3 text-[15px]">
          Currently unavailable
        </p>
      ) : null}
      {quiet ? null : <p className="mt-2 text-[15px] leading-relaxed text-fg/80">{product.description}</p>}
      {product.variants.length > 1 ? (
        <label className="mt-3 block text-[15px]">
          <span className="sr-only">Option</span>
          <select
            className="mt-1 h-11 w-full border border-rule bg-paper px-2"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.available}>
                {v.title}
                {v.available ? "" : " — currently unavailable"}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {available ? (
        <div className="mt-4">
          <a href={cartUrl(variantId)} className="inline-flex h-11 items-center bg-ink px-4 text-[15px] text-paper">
            Check out
          </a>
          {quiet ? null : <p className="mt-2 text-[13px] text-muted">{checkoutNote}</p>}
        </div>
      ) : null}
    </article>
  );
}
