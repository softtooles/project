import Image from "next/image";

export function PrivacyPolicy() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <p className="text-sm text-muted-foreground mb-6">Last updated: March 22, 2026</p>

          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains what data we may collect, how it is used,
            and what choices you have while using our website and online tools.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Depending on how you use the website, we may collect limited technical information,
            including browser type, device information, pages visited, and usage interactions.
            If you contact us directly, we may also receive your email address and the details
            you include in your message.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. Tool Input Data</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Many tools on Softtooles are designed to process data directly in your browser.
            While we aim to minimize server-side handling of user inputs, you should avoid
            entering sensitive personal, financial, legal, or confidential data unless you are
            certain it is appropriate for your use case.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. How We Use Information</h2>
          <ul className="list-disc pl-6 text-muted-foreground leading-7 space-y-2 mb-4">
            <li>To maintain and improve site performance and reliability.</li>
            <li>To understand aggregate usage trends and optimize user experience.</li>
            <li>To respond to support requests, feedback, or business inquiries.</li>
            <li>To prevent abuse, spam, or malicious activity on the platform.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Cookies and Similar Technologies</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We may use cookies or similar technologies to support essential website functions,
            remember preferences, and analyze anonymous usage behavior. You can manage cookie
            settings through your browser at any time.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Third-Party Services</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles may rely on trusted third-party tools or infrastructure providers for
            hosting, analytics, security, or performance optimization. These providers may process
            technical data according to their own privacy policies and legal obligations.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Data Retention</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            We retain information only for as long as necessary to fulfill operational,
            security, and legal requirements. Contact messages may be retained for support,
            quality review, and follow-up communication.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Your Rights and Choices</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            You may contact us to ask privacy-related questions, request updates, or seek deletion
            of direct contact information you have shared with us, subject to legal and operational
            requirements.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Policy Updates</h2>
          <p className="text-muted-foreground leading-7">
            We may update this Privacy Policy periodically. Continued use of Softtooles after
            changes are published means you accept the revised policy.
          </p>
        </div>
      </div>
    </section>
  );
}
