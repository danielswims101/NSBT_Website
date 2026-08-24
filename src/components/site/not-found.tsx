import { Link } from "@/components/site/link";
import { PageWidth } from "./page-hero";

export function NotFoundPage() {
  return (
    <PageWidth>
      <h1 className="font-display text-4xl text-ink">This page is not on the site.</h1>
      <p className="mt-6 text-[17px] leading-[1.65]">
        <Link to="/" className="underline-offset-4 hover:underline">
          Home
        </Link>
        {" · "}
        <Link to="/find" className="underline-offset-4 hover:underline">
          Find
        </Link>
        {" · "}
        <Link to="/contact" className="underline-offset-4 hover:underline">
          Contact
        </Link>
      </p>
    </PageWidth>
  );
}
