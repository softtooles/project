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

export function ToolDetailsSection({ pathname }: ToolDetailsSectionProps) {
  const toolName = getToolName(pathname);

  return (
    <section className="mt-14 rounded-2xl border border-border bg-card/60 p-6 lg:p-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">{toolName}: Detailed Guide and Working Process</h2>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          The {toolName} page is designed to help you finish real tasks quickly without installing any software, and the whole workflow runs directly in your browser. When you open this page, the interface focuses on three things: clean input, immediate processing, and reliable output. First, you provide data in the input area. That data can be text, code, numbers, or structured content depending on the tool. The moment you click the main action button, the tool applies a deterministic process to the data. Deterministic means the same input always gives the same output, which is important for debugging, repeatability, and confidence. The output area updates instantly, so you can verify results without navigating away.
        </p>
        <p>
          Internally, {toolName} follows a predictable pipeline. Step one is input validation. The page checks whether the required field is empty, whether formatting is acceptable, and whether the content can be parsed by the selected operation. If validation fails, you get a clear error message instead of silent failure. Step two is transformation logic. This is where the core algorithm for {toolName} runs. For example, formatting tools parse and normalize structure, converters map values between representations, generators create fresh values under selected constraints, and calculators apply formula-based operations. Step three is presentation. The resulting output is rendered in a readable block with copy support, so you can use it in your project immediately.
        </p>
        <p>
          Accuracy and usability are balanced carefully. The page avoids hidden behavior and keeps controls explicit, so you always know what each action does. In most cases, there are dedicated actions for alternate outcomes, such as format versus minify, encode versus decode, or calculate versus reset. This improves clarity and avoids accidental overwrites. If your workflow requires iteration, you can modify the same input and run again repeatedly. Because the tool is browser-based, feedback is fast and ideal for trial-and-error refinement. The copy action is intentionally close to output because most users need to transfer results into code editors, API clients, spreadsheets, CMS forms, or deployment dashboards.
        </p>
        <p>
          The practical usage pattern for {toolName} is simple but powerful: prepare your raw value, process it once, verify the output, and then reuse it wherever needed. If an error appears, correct the input and run again until the output is valid. This cycle reduces context-switching and saves time compared with desktop utilities. For teams, the consistent behavior also helps standardize outcomes across developers and devices. On mobile, tablet, and desktop, the same process remains available, making quick fixes possible even when you are away from your main machine. In short, {toolName} works as a focused browser utility with validation, transformation, and output delivery in one place, so you can complete technical tasks faster with fewer mistakes and a smoother workflow.
        </p>
      </div>
    </section>
  );
}
