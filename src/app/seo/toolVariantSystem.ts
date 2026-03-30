export type ToolVariantRecord = {
  baseToolSlug: string;
  baseToolName: string;
  variantSlug: string;
  fromTerm?: string;
  toTerm?: string;
  modeTerm?: string;
  compressSizeKb?: number;
  kind: "convert" | "compress" | "transform" | "generate" | "calculate";
};

const baseUrl = "https://softtooles.com";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCaseFromSlug(slug: string): string {
  // Convert "json-formatter" => "JSON Formatter"
  const wordMap: Record<string, string> = {
    json: "JSON",
    css: "CSS",
    html: "HTML",
    url: "URL",
    uuid: "UUID",
    jwt: "JWT",
    sql: "SQL",
    xml: "XML",
    csv: "CSV",
    qr: "QR",
    rgb: "RGB",
    bmi: "BMI",
    urlencoder: "URL Encoder",
    urldecoder: "URL Decoder",
    encoder: "Encoder",
    decoder: "Decoder",
    formatter: "Formatter",
    validator: "Validator",
    tester: "Tester",
    converter: "Converter",
    minifier: "Minifier",
    beautifier: "Beautifier",
    generator: "Generator",
    calculator: "Calculator",
    reverser: "Reverser",
    "remove-duplicates": "Remove Duplicates",
  };

  return slug
    .split("-")
    .map((part) => {
      const key = part.toLowerCase();
      return wordMap[key] ?? (part[0]?.toUpperCase() + part.slice(1));
    })
    .join(" ")
    .replace(/\bJson\b/g, "JSON");
}

type ToolVariantTerms = {
  kind: ToolVariantRecord["kind"];
  fromTerms: string[];
  toTerms: string[];
  modeTerms: string[];
  compressSizesKb?: number[];
};

function getToolVariantTerms(baseToolSlug: string): ToolVariantTerms {
  // Heuristic term sets. These define the URL space and SEO content variables.
  // IMPORTANT: Titles/descriptions are templated; avoid adding unsupported functionality claims.

  if (baseToolSlug === "image-converter") {
    return {
      kind: "convert",
      fromTerms: ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg", "tiff", "heic", "avif", "raw", "bitmap"],
      toTerms: ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg", "tiff", "heic", "avif", "optimized", "compressed"],
      modeTerms: [
        "fast",
        "secure",
        "no-install",
        "mobile-ready",
        "browser-based",
        "high-quality",
        "lossless",
        "lossy",
        "web-ready",
        "seo-friendly",
        "copy-ready",
        "share-ready",
        "privacy-first",
        "instant",
        "clean-output",
        "validated",
        "safe-output",
        "reliable",
        "deterministic",
        "production",
      ],
      compressSizesKb: [10, 15, 20, 30, 40, 50, 75, 100, 150, 200],
    };
  }

  const s = baseToolSlug.toLowerCase();

  const commonFrom = [
    "input",
    "raw-data",
    "payload",
    "snippet",
    "document",
    "code",
    "text",
    "configuration",
    "data",
    "request",
    "response",
    "content",
  ];
  const commonTo = [
    "output",
    "result",
    "processed",
    "converted",
    "optimized",
    "clean",
    "formatted",
    "validated",
    "ready",
    "production",
    "mobile-ready",
    "seo-friendly",
  ];
  const commonModes = [
    "fast",
    "secure",
    "no-install",
    "browser-based",
    "instant",
    "copy-ready",
    "share-ready",
    "privacy-first",
    "deterministic",
    "clean-output",
    "verified",
    "strict",
    "safe-output",
    "step-by-step",
    "with-examples",
    "mobile-friendly",
    "quality-first",
    "developer-ready",
    "reliable",
    "standard",
    "custom",
    "default",
    "accurate",
    "consistent",
    "premium",
  ];

  if (s.includes("json")) {
    return {
      kind: "convert",
      fromTerms: ["json", "api-response", "payload", "webhook", "request-body", "config", "object", "data-file", "log-entry", "metadata", "schema", "json-payload"],
      toTerms: [
        "pretty-json",
        "minified-json",
        "validated-json",
        "sorted-json",
        "escaped-json",
        "clean-json",
        "indented-json",
        "compact-json",
        "normalized-json",
        "safe-json",
        "readable-json",
        "strict-json",
      ],
      modeTerms: commonModes,
    };
  }

  if (s.includes("css")) {
    return {
      kind: s.includes("minifier") ? "transform" : "convert",
      fromTerms: ["css", "styles", "stylesheet", "theme", "design-tokens", "inline-styles", "frontend-styles", "component-styles", "custom-props", "code-snippet", "tailwind-config", "ui-styles"],
      toTerms: [
        "minified-css",
        "compressed-css",
        "optimized-css",
        "beautified-css",
        "whitespace-removed",
        "clean-css",
        "safe-css",
        "short-hex-css",
        "production-css",
        "fast-loading-css",
        "ready-css",
        "mobile-css",
      ],
      modeTerms: commonModes,
    };
  }

  if (s.includes("html")) {
    return {
      kind: s.includes("minifier") ? "transform" : "convert",
      fromTerms: ["html", "markup", "webpage-template", "email-template", "snippet", "document", "component-html", "raw-markup", "tag-string", "content-layout", "section", "page-template"],
      toTerms: [
        "formatted-html",
        "indented-html",
        "minified-html",
        "clean-html",
        "optimized-html",
        "validated-html",
        "structured-html",
        "readable-markup",
        "compact-markup",
        "safe-markup",
        "production-html",
        "seo-ready-html",
      ],
      modeTerms: commonModes,
    };
  }

  if (s.includes("base64")) {
    return {
      kind: "convert",
      fromTerms: ["text", "plain-text", "binary", "token", "credentials", "email", "url", "json-string", "log", "payload", "byte-stream", "configuration"],
      toTerms: ["base64", "encoded-base64", "decoded-text", "url-safe-base64", "web-safe-base64", "compact-base64", "safe-base64", "standard-base64", "decoded-json", "decoded-payload", "encoded-result", "normalized-base64"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("url-encoder")) {
    return {
      kind: "convert",
      fromTerms: ["text", "url", "query", "parameter", "search-term", "path", "tracking-url", "redirect-url", "coupon-code", "utm", "symbols", "special-string"],
      toTerms: ["url-encoded", "encoded-url", "decoded-text", "decoded-query", "query-encoded", "path-encoded", "safe-url", "compact-url", "seo-friendly-url", "browser-ready-url", "special-char-encoded", "safe-redirect"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("html-encoder")) {
    return {
      kind: "convert",
      fromTerms: ["text", "html", "markup", "entities", "snippet", "document", "tag-string", "content", "attribute", "template", "code-snippet", "message"],
      toTerms: ["html-entities", "encoded-html", "decoded-html", "safe-markup", "escaped-html", "unescaped-html", "compact-entities", "structured-entities", "ready-markup", "production-markup", "copy-ready-markup", "normalized-html"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("color")) {
    return {
      kind: "convert",
      fromTerms: ["hex", "rgb", "hsl", "color-code", "brand-color", "theme-color", "design-token", "color-value", "palette-color", "css-color", "paint-code", "gradient-color"],
      toTerms: ["converted-color", "normalized-color", "css-rgb", "css-hex", "css-hsl", "rgb-value", "hex-value", "hsl-value", "production-color", "web-color", "safe-color", "readable-color"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("temperature")) {
    return {
      kind: "convert",
      fromTerms: ["celsius", "fahrenheit", "kelvin", "weather-temp", "lab-temp", "equipment-temp", "outdoor-temp", "recipe-temp", "body-temp", "water-temp", "air-temp", "measured-temp"],
      toTerms: ["to-fahrenheit", "to-celsius", "to-kelvin", "converted-temp", "normalized-temp", "rounded-temp", "exact-temp", "ready-temp", "display-temp", "production-temp", "safe-temp", "verified-temp"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("unit-converter")) {
    return {
      kind: "convert",
      fromTerms: ["meters", "kilometers", "miles", "feet", "inches", "grams", "kilograms", "pounds", "ounces", "celsius", "fahrenheit", "seconds"],
      toTerms: ["converted-units", "normalized-units", "production-units", "rounded-units", "exact-units", "safe-units", "ready-units", "mobile-units", "seo-units", "developer-units", "verified-units", "consistent-units"],
      modeTerms: commonModes,
    };
  }

  if (s.includes("csv") || s.includes("json-to-csv") || s.includes("csv-to-json")) {
    return {
      kind: "convert",
      fromTerms: ["csv", "spreadsheet", "table", "data-file", "export", "records", "rows", "columns", "dataset", "input-table", "bulk-data", "list"],
      toTerms: ["json", "json-array", "objects", "converted-data", "ready-data", "api-ready", "normalized-json", "clean-json", "production-json", "import-ready", "structured-json", "verified-json"],
      modeTerms: commonModes,
    };
  }

  // Fallback: generate lots of SEO variants for any tool.
  return {
    kind: s.includes("calculator") ? "calculate" : s.includes("generator") ? "generate" : "transform",
    fromTerms: commonFrom,
    toTerms: commonTo,
    modeTerms: commonModes,
  };
}

function variantSlugPartsFor(
  baseToolSlug: string,
  variantSlug: string
): Omit<ToolVariantRecord, "variantSlug" | "baseToolName" | "baseToolSlug"> | null {
  const terms = getToolVariantTerms(baseToolSlug);
  const fromMap = new Map(terms.fromTerms.map((t) => [slugify(t), t]));
  const toMap = new Map(terms.toTerms.map((t) => [slugify(t), t]));
  const modeMap = new Map(terms.modeTerms.map((t) => [slugify(t), t]));

  if (baseToolSlug === "image-converter") {
    // compress-image-to-20kb[-mode-x]
    const compressRegex = /^compress-image-to-(\d+)kb(?:-mode-(.+))?$/i;
    const compressMatch = variantSlug.match(compressRegex);
    if (compressMatch) {
      const size = Number(compressMatch[1]);
      const modeSlug = compressMatch[2];
      const modeTerm = modeSlug ? modeMap.get(modeSlug) : undefined;
      return {
        kind: "compress",
        compressSizeKb: Number.isFinite(size) ? size : undefined,
        fromTerm: undefined,
        toTerm: undefined,
        modeTerm,
      };
    }

    // {from}-to-{to}[-mode-{mode}]
    const modeSplit = variantSlug.split("-mode-");
    const core = modeSplit[0];
    const modeSlug = modeSplit.length > 1 ? modeSplit.slice(1).join("-") : undefined;
    const modeTerm = modeSlug ? modeMap.get(modeSlug) : undefined;

    const coreSplit = core.split("-to-");
    if (coreSplit.length === 2) {
      const fromSlug = coreSplit[0];
      const toSlug = coreSplit[1];
      const fromTerm = fromMap.get(fromSlug);
      const toTerm = toMap.get(toSlug);
      if (fromTerm && toTerm) {
        return {
          kind: "convert",
          fromTerm,
          toTerm,
          modeTerm,
        };
      }
    }
  }

  // Generic: {from}-to-{to}-mode-{mode} (mode is optional)
  const modeSplit = variantSlug.split("-mode-");
  const core = modeSplit[0];
  const modeSlug = modeSplit.length > 1 ? modeSplit.slice(1).join("-") : undefined;
  const modeTerm = modeSlug ? modeMap.get(modeSlug) : undefined;

  const coreSplit = core.split("-to-");
  if (coreSplit.length === 2) {
    const fromSlug = coreSplit[0];
    const toSlug = coreSplit[1];
    const fromTerm = fromMap.get(fromSlug);
    const toTerm = toMap.get(toSlug);
    if (fromTerm && toTerm) {
      return {
        kind: terms.kind,
        fromTerm,
        toTerm,
        modeTerm,
      };
    }
  }

  return null;
}

export function getVariantRecordFromPathname(pathname: string): ToolVariantRecord | null {
  // Expected pathname: /tools/{baseToolSlug}/{variantSlug}
  if (!pathname.startsWith("/tools/")) return null;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 3) return null;

  const baseToolSlug = parts[1];
  const variantSlug = parts[2];

  const parsed = variantSlugPartsFor(baseToolSlug, variantSlug);
  if (!parsed) return null;

  return {
    baseToolSlug,
    baseToolName: titleCaseFromSlug(baseToolSlug),
    variantSlug,
    ...parsed,
  };
}

export function generateVariantTitle(record: ToolVariantRecord): string {
  const toolName = record.baseToolName;
  if (record.kind === "compress" && typeof record.compressSizeKb === "number") {
    return `Free Image Compression to ${record.compressSizeKb}KB Online - Fast & Secure`;
  }

  const from = record.fromTerm ?? "Input";
  const to = record.toTerm ?? "Output";
  const niceFrom = from
    .replace(/\bjson\b/gi, "JSON")
    .replace(/\bcss\b/gi, "CSS")
    .replace(/\bhtml\b/gi, "HTML")
    .replace(/\burl\b/gi, "URL");

  const niceTo = to
    .replace(/\bjson\b/gi, "JSON")
    .replace(/\bcss\b/gi, "CSS")
    .replace(/\bhtml\b/gi, "HTML")
    .replace(/\burl\b/gi, "URL");

  return `Free ${niceFrom} to ${niceTo} ${toolName} Online - Fast & Secure`;
}

export function generateVariantDescription(record: ToolVariantRecord): string {
  if (record.kind === "compress" && typeof record.compressSizeKb === "number") {
    return `Compress images to about ${record.compressSizeKb}KB using a fast, browser-based workflow. No install, mobile-friendly, and copy-ready output.`;
  }

  const from = record.fromTerm ?? "input";
  const to = record.toTerm ?? "output";
  const mode = record.modeTerm ? `Mode: ${record.modeTerm}. ` : "";
  return `${mode}Convert ${from} to ${to} online with an instant, privacy-first process. Designed for developers who want reliable, readable, and production-ready results.`;
}

export function getToolVariantBaseUrl(baseToolSlug: string, variantSlug: string): string {
  return `${baseUrl}/tools/${baseToolSlug}/${variantSlug}`;
}

export function generateVariantsForBaseTool(baseToolSlug: string): ToolVariantRecord[] {
  const terms = getToolVariantTerms(baseToolSlug);
  const baseToolName = titleCaseFromSlug(baseToolSlug);

  const records: ToolVariantRecord[] = [];

  if (baseToolSlug === "image-converter") {
    // Conversion variants: {from}-to-{to} (and optionally with mode)
    for (const fromTerm of terms.fromTerms) {
      for (const toTerm of terms.toTerms) {
        const fromKey = slugify(fromTerm);
        const toKey = slugify(toTerm);
        if (!fromKey || !toKey) continue;
        if (fromKey === toKey) continue;

        const variantSlugCore = `${fromKey}-to-${toKey}`;
        records.push({
          baseToolSlug,
          baseToolName,
          variantSlug: variantSlugCore,
          fromTerm,
          toTerm,
          kind: "convert",
        });

        // Mode-suffixed variants to increase the URL space.
        for (const modeTerm of terms.modeTerms) {
          const modeKey = slugify(modeTerm);
          records.push({
            baseToolSlug,
            baseToolName,
            variantSlug: `${variantSlugCore}-mode-${modeKey}`,
            fromTerm,
            toTerm,
            modeTerm,
            kind: "convert",
          });
        }
      }
    }

    // Compression variants: compress-image-to-{size}kb (and optionally with mode)
    const sizes = terms.compressSizesKb ?? [];
    for (const size of sizes) {
      const core = `compress-image-to-${size}kb`;
      records.push({
        baseToolSlug,
        baseToolName,
        variantSlug: core,
        kind: "compress",
        compressSizeKb: size,
      });
      for (const modeTerm of terms.modeTerms.slice(0, 10)) {
        const modeKey = slugify(modeTerm);
        records.push({
          baseToolSlug,
          baseToolName,
          variantSlug: `${core}-mode-${modeKey}`,
          kind: "compress",
          compressSizeKb: size,
          modeTerm,
        });
      }
    }

    return records;
  }

  // Generic: {from}-to-{to}-mode-{mode}
  for (const fromTerm of terms.fromTerms) {
    for (const toTerm of terms.toTerms) {
      const fromKey = slugify(fromTerm);
      const toKey = slugify(toTerm);
      if (!fromKey || !toKey) continue;
      if (fromKey === toKey) continue;

      const core = `${fromKey}-to-${toKey}`;
      for (const modeTerm of terms.modeTerms) {
        const modeKey = slugify(modeTerm);
        records.push({
          baseToolSlug,
          baseToolName,
          variantSlug: `${core}-mode-${modeKey}`,
          fromTerm,
          toTerm,
          modeTerm,
          kind: terms.kind,
        });
      }
    }
  }

  return records;
}

export function getTopVariantPaths(baseToolSlugs: string[], topN: number): string[] {
  // Returns pathnames like "/tools/{baseToolSlug}/{variantSlug}"
  const scored: Array<{ path: string; score: number }> = [];

  for (const baseToolSlug of baseToolSlugs) {
    const terms = getToolVariantTerms(baseToolSlug);
    // Build popularity scores based on array ordering (earlier = more popular).
    const fromScore = new Map(terms.fromTerms.map((t, i) => [slugify(t), terms.fromTerms.length - i]));
    const toScore = new Map(terms.toTerms.map((t, i) => [slugify(t), terms.toTerms.length - i]));
    const modeScore = new Map(terms.modeTerms.map((t, i) => [slugify(t), terms.modeTerms.length - i]));

    if (baseToolSlug === "image-converter") {
      for (const fromTerm of terms.fromTerms) {
        for (const toTerm of terms.toTerms) {
          const fromKey = slugify(fromTerm);
          const toKey = slugify(toTerm);
          if (fromKey === toKey) continue;
          const core = `${fromKey}-to-${toKey}`;
          // Mode-less
          scored.push({
            path: `/tools/${baseToolSlug}/${core}`,
            score: (fromScore.get(fromKey) ?? 1) * (toScore.get(toKey) ?? 1) * 1,
          });

          for (const modeTerm of terms.modeTerms) {
            const modeKey = slugify(modeTerm);
            scored.push({
              path: `/tools/${baseToolSlug}/${core}-mode-${modeKey}`,
              score: (fromScore.get(fromKey) ?? 1) * (toScore.get(toKey) ?? 1) * (modeScore.get(modeKey) ?? 1),
            });
          }
        }
      }

      const sizes = terms.compressSizesKb ?? [];
      for (const size of sizes) {
        const core = `compress-image-to-${size}kb`;
        scored.push({
          path: `/tools/${baseToolSlug}/${core}`,
          score: (1000 - size) * 1,
        });
      }
    } else {
      for (const fromTerm of terms.fromTerms) {
        for (const toTerm of terms.toTerms) {
          const fromKey = slugify(fromTerm);
          const toKey = slugify(toTerm);
          if (fromKey === toKey) continue;
          const core = `${fromKey}-to-${toKey}`;

          for (const modeTerm of terms.modeTerms) {
            const modeKey = slugify(modeTerm);
            const score = (fromScore.get(fromKey) ?? 1) * (toScore.get(toKey) ?? 1) * (modeScore.get(modeKey) ?? 1);
            scored.push({
              path: `/tools/${baseToolSlug}/${core}-mode-${modeKey}`,
              score,
            });
          }
        }
      }
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topN).map((x) => x.path);
}

