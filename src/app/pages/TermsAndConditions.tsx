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

          <p className="text-sm text-muted-foreground mb-6">Last updated: March 22, 2026</p>

          <p className="text-muted-foreground leading-7 mb-4">
            These Terms &amp; Conditions govern your use of Softtooles. By accessing or using
            this website, you agree to follow these terms. If you do not agree, please stop
            using the website and its tools.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Service Scope</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles provides online utilities for development and productivity tasks,
            including formatting, conversion, generation, and calculation tools. Services are
            offered on an "as-is" and "as-available" basis.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. Acceptable Use</h2>
          <p className="text-muted-foreground leading-7 mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 text-muted-foreground leading-7 space-y-2 mb-4">
            <li>Use the website for unlawful, harmful, or abusive activities.</li>
            <li>Attempt to disrupt, reverse engineer, or compromise platform security.</li>
            <li>Upload or process content that violates applicable laws or rights.</li>
            <li>Automate abusive traffic that harms service availability for others.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Output Verification</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Tool outputs may vary based on input quality and edge cases. You are solely
            responsible for reviewing and validating any generated output before relying on it
            in production, legal, financial, academic, or security-critical contexts.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            The Softtooles brand, website design, text content, and software elements are
            protected by applicable intellectual property laws. Unauthorized copying,
            redistribution, or commercial reuse without permission is prohibited.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Third-Party Dependencies</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Some features may depend on third-party services or libraries. We are not responsible
            for outages, policy changes, or behavior of third-party providers beyond our control.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            To the fullest extent permitted by law, Softtooles is not liable for any direct,
            indirect, incidental, or consequential damages resulting from the use of the website,
            including data loss, project delays, or business disruption.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Changes to Services and Terms</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We may update tools, modify features, suspend access, or revise these terms at any
            time without prior notice. Updated terms become effective when published on this page.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Contact</h2>
          <p className="text-muted-foreground leading-7">
            For questions about these Terms &amp; Conditions, please use the Contact Us page.
          </p>
        </div>
      </div>
    </section>
  );
}
