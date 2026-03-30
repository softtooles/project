import Link from "next/link";
import { getVariantRecordFromPathname, generateVariantDescription, generateVariantTitle, generateVariantsForBaseTool } from "@/app/seo/toolVariantSystem";

type ToolVariantPageProps = {
  pathname: string;
};

const variantsCache = new Map<string, ReturnType<typeof generateVariantsForBaseTool>>();

function buildFaq(record: ReturnType<typeof getVariantRecordFromPathname>) {
  if (!record) return [];
  const toolName = record.baseToolName;
  const from = record.fromTerm ?? "input";
  const to = record.toTerm ?? "output";
  const mode = record.modeTerm ?? "default";

  const faqs = [
    {
      q: `How does ${toolName} convert ${from} to ${to} online?`,
      a: `You paste your ${from} into the tool input, select the processing mode described on this page (${mode}), run the conversion, then copy the ${to} result.`,
    },
    {
      q: `Is this ${toolName} converter free to use?`,
      a: `Yes. This page is designed to be fast and accessible without requiring installs. You can use it whenever you need a quick conversion or normalization.`,
    },
    {
      q: `What input format should I use for ${from}?`,
      a: `Use a clean and properly structured ${from} value. If your content contains special characters, make sure it matches the expected structure for the conversion.`,
    },
    {
      q: `Why might conversion fail for some ${from} inputs?`,
      a: `Conversion can fail when the input is malformed, missing required parts, or contains unsupported characters. Try validating the input first and rerun the conversion.`,
    },
    {
      q: `How do I reuse the converted ${to} safely?`,
      a: `After conversion, copy the output from the page. Then verify it before using it in production, especially if it affects code, configuration, or security-related workflows.`,
    },
  ];

  return faqs;
}

function buildHowTo(record: ReturnType<typeof getVariantRecordFromPathname>) {
  if (!record) return null;
  const toolName = record.baseToolName;
  const from = record.fromTerm ?? "input";
  const to = record.toTerm ?? "output";
  const mode = record.modeTerm ?? "default";

  const steps = [
    { name: "Prepare your input", text: `Paste your ${from} into the input area on this ${toolName} variant page.` },
    { name: "Choose the processing option", text: `Use the mode described for this page (${mode}) so the output is generated in the format you need.` },
    { name: "Run the conversion", text: `Click the main action to process your input and generate ${to}.` },
    { name: "Copy the result", text: `Copy the converted ${to} output using the page copy button.` },
    { name: "Verify before using", text: `Double-check the output for correctness and edge cases before you use it in your project.` },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${toolName}: ${from} to ${to} (Online)`,
    description: generateVariantDescription(record),
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };
}

export function ToolVariantPage({ pathname }: ToolVariantPageProps) {
  const record = getVariantRecordFromPathname(pathname);

  if (!record) {
    return (
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <h1 className="text-3xl font-bold mb-4">Tool variant not found</h1>
            <p className="text-muted-foreground">
              This URL does not match a supported tool variant format.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const title = generateVariantTitle(record);
  const description = generateVariantDescription(record);
  const faqs = buildFaq(record);
  const howTo = buildHowTo(record);

  let variantsForBase = variantsCache.get(record.baseToolSlug);
  if (!variantsForBase) {
    variantsForBase = generateVariantsForBaseTool(record.baseToolSlug);
    variantsCache.set(record.baseToolSlug, variantsForBase);
  }
  const related = variantsForBase
    .filter((v) => v.variantSlug !== record.variantSlug || v.baseToolSlug !== record.baseToolSlug)
    .sort((a, b) => {
      // Highly relevant first:
      // - Same base tool (already true)
      // - Same conversion direction: same from OR same to
      // - Same kind (convert/compress/etc)
      // - Similar mode if present
      const score = (v: typeof a) => {
        let s = 0;
        if (v.kind === record.kind) s += 5;
        if (record.fromTerm && v.fromTerm === record.fromTerm) s += 6;
        if (record.toTerm && v.toTerm === record.toTerm) s += 6;
        if (record.fromTerm && record.toTerm && v.fromTerm === record.fromTerm && v.toTerm === record.toTerm) s += 10;
        if (record.modeTerm && v.modeTerm === record.modeTerm) s += 3;
        if (record.compressSizeKb && v.compressSizeKb === record.compressSizeKb) s += 4;
        return s;
      };
      return score(b) - score(a);
    })
    .slice(0, 10);

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  const baseToolRoute = `/tools/${record.baseToolSlug}`;

  return (
    <>
      {/* JSON-LD */}
      {howTo && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-muted-foreground leading-7 mb-8">{description}</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "")}
                className="px-5 py-3 rounded-xl border border-border/60 hover:bg-accent transition-colors font-semibold"
              >
                Copy Link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-border/60 hover:bg-accent transition-colors font-semibold text-center"
              >
                Share Tool
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-border/50 bg-card/40 mb-10">
              <h2 className="text-xl font-semibold mb-3">How to use this variant</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-7">
                <li>Open the tools page for your base converter.</li>
                <li>Select the option described on this page.</li>
                <li>Process your input and copy the output.</li>
              </ol>

              <div className="mt-6">
                <Link
                  href={baseToolRoute}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl logo-gradient text-white font-semibold shadow-xl shadow-cyan-700/25"
                >
                  Open {record.baseToolName}
                </Link>
              </div>
            </div>

            {faqs.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">FAQ</h2>
                <div className="space-y-4">
                  {faqs.map((f, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border/50 bg-card/30">
                      <h3 className="font-semibold mb-2">{f.q}</h3>
                      <p className="text-muted-foreground leading-7">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={`${r.baseToolSlug}:${r.variantSlug}`}
                    href={`/tools/${r.baseToolSlug}/${r.variantSlug}`}
                    className="p-5 rounded-xl border border-border/50 bg-card/30 hover:border-cyan-500/50 transition-colors"
                  >
                    <p className="text-sm text-muted-foreground mb-2">Variant</p>
                    <p className="font-semibold">{generateVariantTitle(r)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

