import { CANONICAL_ORIGIN, school } from "@/content/site";

export function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: school.name,
    alternateName: school.short,
    url: CANONICAL_ORIGIN,
    telephone: school.phone,
    email: "studentservices@nsbt.org",
    logo: `${CANONICAL_ORIGIN}/images/nsbt-seal.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "111 North Orange Avenue, Suite 800",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32801",
      addressCountry: "US",
    },
  };
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: school.name,
    url: CANONICAL_ORIGIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${CANONICAL_ORIGIN}/find?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
    </>
  );
}

export function productJsonLd(p: {
  name: string;
  image?: string;
  price: string;
  available: boolean;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image ? [`${CANONICAL_ORIGIN}${p.image}`] : undefined,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "USD",
      availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: p.url,
    },
  };
}
