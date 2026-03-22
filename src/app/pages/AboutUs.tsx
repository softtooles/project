import Image from "next/image";

export function AboutUs() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl font-bold">About Us</h1>
          </div>

          <p className="text-sm text-muted-foreground mb-6">Last updated: March 22, 2026</p>

          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles is an online developer and productivity tools platform focused on speed,
            usability, and privacy-first experiences. Our goal is to help developers, students,
            freelancers, and technical teams solve day-to-day formatting, conversion, generation,
            and calculation tasks quickly from any device.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">What We Build</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We build browser-based utilities such as formatters, minifiers, encoders,
            converters, validators, generators, and calculators. Tools are designed to
            open instantly, provide clear outputs, and reduce repetitive manual work in
            development and content workflows.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Our Product Principles</h2>
          <ul className="list-disc pl-6 text-muted-foreground leading-7 space-y-2 mb-4">
            <li>Speed first: fast page load and immediate tool feedback.</li>
            <li>Privacy aware: as much processing as possible is done in-browser.</li>
            <li>Clean UX: simple interfaces without unnecessary friction.</li>
            <li>Mobile-ready: core tools remain usable on phones and tablets.</li>
            <li>Practical output: results are made for real implementation needs.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">Who Softtooles Is For</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles supports frontend and backend developers, QA engineers, technical writers,
            DevOps learners, students, and anyone who needs reliable web-based utility tools.
            Whether you are debugging JSON, converting values, generating IDs, or cleaning code,
            the platform is built to save time.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Continuous Improvement</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We regularly improve tool accuracy, UI quality, and performance based on usage trends
            and feedback. Existing tools may be upgraded, new tools may be added, and selected tools
            may be redesigned to maintain a higher quality standard.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Contact & Collaboration</h2>
          <p className="text-muted-foreground leading-7">
            For support, feedback, bug reports, or business collaboration, please visit our Contact Us
            page. We value useful feedback that helps us make the platform more accurate and efficient.
          </p>
        </div>
      </div>
    </section>
  );
}
