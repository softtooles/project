interface ToolDetailsSectionProps {
  pathname: string;
}

function toTitleCase(slug: string): string {
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
  };

  return slug
    .split("-")
    .map((part) => wordMap[part.toLowerCase()] ?? part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function getToolName(pathname: string): string {
  const slug = pathname.replace("/tools/", "");
  return toTitleCase(slug);
}

function slugHash(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Five distinct paragraph sets so base tool pages differ more for crawlers. */
const PARAGRAPH_VARIATIONS: string[][] = [
  [
    "The {NAME} page is built so you can finish real tasks quickly without installing software. Everything runs in your browser: you supply input in a clear field, trigger processing with one primary action, and read results in a dedicated output area. The layout keeps those three steps obvious so you rarely hunt for controls. Because processing is deterministic, repeating the same input yields the same output—useful when you are debugging or comparing runs.",
    "Behind the scenes, {NAME} follows a straight pipeline. First, lightweight validation checks empty fields, obviously invalid formats, and cases the tool cannot parse. If something fails, you see an explicit message instead of a silent no-op. Second, the core transformation runs—whether that is formatting, encoding, generating values, or calculating results. Third, the UI renders the outcome with copy support so you can move data into an editor, terminal, ticket, or deployment flow without retyping.",
    "{NAME} keeps behavior explicit: alternate actions (format vs minify, encode vs decode, reset vs run) stay visible so you do not overwrite output by accident. Iteration is cheap—tweak input, run again, compare. On mobile you get the same sequence, which helps when you are away from your desk but still need a reliable utility. Copy actions sit next to output because that is the most common next step for developers.",
    "A practical workflow with {NAME} is: prepare clean input, run once, sanity-check output, then paste where you need it. If output looks wrong, fix the input and rerun until it matches expectations. Teams benefit from consistent behavior across machines; individuals save time versus desktop one-offs. In short, {NAME} packages validation, transformation, and handoff in one focused page.",
  ],
  [
    "Use {NAME} when you want a single-purpose utility that loads fast and stays out of your way. The page emphasizes a minimal path from raw input to finished output: no installers, no account wall for basic usage, and feedback as soon as you act. That makes it useful for ad-hoc fixes during development, content work, or ops tasks where context switching is expensive.",
    "Execution for {NAME} is structured in layers. Input is normalized and checked against what the tool can accept; unsupported patterns surface early. The engine then applies the specific logic for this utility—parsing, conversion, generation, or math—without hidden side effects. Finally, results are shown in a readable block with affordances to copy or rerun, matching how developers actually work.",
    "Usability for {NAME} favors clarity over cleverness. Labels and actions map to outcomes you expect, and destructive or irreversible steps are avoided in favor of reversible edits to input. Fast iteration matters: you can experiment with values, observe changes immediately, and stop when the output is good enough to ship to the next system in your chain.",
    "Think of {NAME} as a small workstation: input on one side, controls in the middle, output on the other. That mental model stays consistent across devices. Whether you are cleaning data before a commit, preparing a payload for an API, or double-checking a calculation, the same rhythm applies—less friction, fewer mistakes, quicker closure.",
  ],
  [
    "{NAME} targets people who need dependable browser utilities without a heavy toolchain. Open the page, drop in your content or values, and execute the main operation. The interface resists clutter: primary workflow stays central, secondary options remain available but secondary. You should always know what will happen before you click the main action.",
    "Technically, {NAME} separates concerns cleanly. Validation guards the tool from malformed input and saves you from confusing failures. The transformation stage is where domain logic lives—this is the piece that differs per utility but always returns structured output where possible. Presentation then formats that output for humans, with emphasis on legibility and one-click copy.",
    "Reliability shows up in small details: predictable button placement, obvious error copy, and output that updates in place. {NAME} is tuned for repeat visits—once you learn the pattern on this page, similar Softtooles tools feel familiar. That reduces cognitive load when you switch between formatters, converters, and calculators during a sprint.",
    "End to end, {NAME} supports a tight loop: edit input, run, verify, ship the result into your stack. If you teach a teammate the same loop, you get shared expectations and fewer “works on my machine” surprises tied to local-only utilities. That is the practical payoff of a consistent, browser-first tool surface.",
  ],
  [
    "If your goal is speed, {NAME} keeps the critical path short. You are not navigating multi-step wizards; you are performing one job well. The page assumes you already know what you want to transform or compute and gives you direct controls to do it. Output is immediate enough for interactive trial, yet stable enough to trust for quick production-adjacent tasks when verified.",
    "The internal flow for {NAME} begins with accepting input in the shape the tool understands—text, structured snippets, or numeric fields depending on the case. It continues with executing the core operation using well-defined rules, and ends by surfacing results in a way you can audit at a glance. Errors are treated as signals to adjust input, not as dead ends.",
    "{NAME} also respects context switching costs. By running entirely client-side where appropriate, you avoid round trips for simple operations and keep latency low. When you need to chain tools, copy output and move on; the page does not force extra navigation. That matters when you are deep in debugging or preparing assets under time pressure.",
    "Summing up, {NAME} is meant to be a dependable micro-tool: scoped, fast, and honest about what it can and cannot do. Use it to reduce friction in everyday technical chores, then return to your main editor or platform with clean output and a clear audit trail of what you ran.",
  ],
  [
    "{NAME} is designed around a simple contract: you bring data, the tool applies a focused operation, you leave with a better version of that data (or a computed result). The experience avoids feature sprawl so the main task stays obvious. This makes it easier to recommend to teammates and safer to use under time constraints when you cannot afford ambiguous UI.",
    "Operationally, {NAME} validates before it transforms. That ordering prevents wasted work and reduces confusing intermediate states. After validation, the tool executes its specialized routine—consistent with the page title and description—then renders output with enough structure to scan quickly. When multiple modes exist, they are labeled so you can pick intentionally rather than guessing.",
    "Quality for {NAME} includes accessibility of outcomes: readable typography, sensible spacing, and copy targets that reduce mistakes when moving data between systems. The page is responsive so you are not blocked on a phone when verifying a quick fix. These choices add up to fewer retries and less frustration compared with opaque or cramped utilities.",
    "In practice, treat {NAME} as part of your toolkit for repeatable chores: normalize formats, generate tokens, test encodings, or run quick calculations. When the output checks out, promote it to your repo, CMS, or pipeline. If it does not, adjust inputs and iterate—the page is optimized for that loop rather than one-shot-only usage.",
  ],
];

export function ToolDetailsSection({ pathname }: ToolDetailsSectionProps) {
  const toolName = getToolName(pathname);
  const slug = pathname.replace(/^\/tools\//, "").replace(/\/$/, "") || "tool";
  const variantIndex = slugHash(slug) % PARAGRAPH_VARIATIONS.length;
  const paragraphs = PARAGRAPH_VARIATIONS[variantIndex].map((p) => p.replace(/\{NAME\}/g, toolName));

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card/60 p-6 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">{toolName}: Detailed Guide and Working Process</h2>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground">
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </section>
  );
}
