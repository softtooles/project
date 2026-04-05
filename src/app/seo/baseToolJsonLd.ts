const baseUrl = "https://softtooles.com";

type ToolPageMeta = { title: string; description: string };

/** /tools/{slug} only — not variant depth. */
export function isBaseToolPathname(pathname: string): boolean {
  const n = pathname.replace(/^\/+|\/+$/g, "");
  const parts = n.split("/");
  return parts.length === 2 && parts[0] === "tools" && parts[1].length > 0;
}

export function toolSlugFromBasePathname(pathname: string): string {
  return pathname.replace(/^\/tools\//, "").replace(/\/$/, "");
}

export function buildSoftwareApplicationJsonLd(pathname: string, meta: ToolPageMeta) {
  const url = pathname === "/" ? `${baseUrl}/` : `${baseUrl}${pathname}`;
  const slug = toolSlugFromBasePathname(pathname);
  const name = meta.title.replace(/\s*\|\s*Softtooles\s*$/i, "").trim() || slug;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description: meta.description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      `Run ${name} in the browser without installing software.`,
      "Mobile-friendly layout with copy-ready output.",
      "Privacy-first processing designed for quick developer workflows.",
    ],
  };
}

export function buildBaseToolFaqJsonLd(toolDisplayName: string) {
  const faqs = [
    {
      q: `What does ${toolDisplayName} do on Softtooles?`,
      a: `${toolDisplayName} helps you complete a focused task in the browser: you provide input, run the tool, and copy the result. It is built for speed, clarity, and repeatability.`,
    },
    {
      q: `Is ${toolDisplayName} free to use?`,
      a: `Yes. You can use ${toolDisplayName} directly on this page without installing an app. Your workflow stays in the browser with immediate feedback.`,
    },
    {
      q: `How do I get the best results from ${toolDisplayName}?`,
      a: `Start with clean, valid input for your use case, run the action once, verify the output, then copy it into your editor or pipeline. If something looks wrong, adjust the input and try again.`,
    },
    {
      q: `Can I use ${toolDisplayName} on mobile?`,
      a: `Yes. The interface is responsive so you can run ${toolDisplayName} on phones and tablets when you need a quick fix away from your desk.`,
    },
  ];

  return {
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
  };
}
