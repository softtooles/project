import Image from "next/image";

export function TermsAndConditions() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-muted-foreground leading-7 mb-4">
            These tools are provided on an "as-is" basis for informational and productivity use.
          </p>
          <p className="text-muted-foreground leading-7 mb-4">
            You are responsible for how you use generated outputs and conversions.
          </p>
          <p className="text-muted-foreground leading-7">
            We may update, suspend, or modify tools and content without prior notice.
          </p>
        </div>
      </div>
    </section>
  );
}
