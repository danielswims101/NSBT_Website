import { costExplainerLead, ratesNote } from "@/content/copy";

/** Published rates only. Does not multiply, project, or total (v16 D.1). */
export function CostExplainer() {
  return (
    <aside className="mt-8 max-w-3xl border-l-2 border-seal py-1 pl-6" aria-label="Cost explainer">
      <p className="text-[1.05rem] leading-[1.65]">{costExplainerLead}</p>
      <p className="mt-4 text-[15px] text-muted">{ratesNote}</p>
    </aside>
  );
}
