import Image from "next/image";

export function ContactUs() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl font-bold">Contact Us</h1>
          </div>

          <p className="text-sm text-muted-foreground mb-6">Last updated: March 22, 2026</p>

          <p className="text-muted-foreground leading-7 mb-6">
            Need support, want to report an issue, suggest a new tool, or discuss collaboration?
            Reach us using the contact details below. We review all genuine inquiries and try to
            respond as quickly as possible.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Email</h2>
              <p className="text-muted-foreground">hello@softtools.studio</p>
            </div>
            <div className="glass-panel rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Response Time</h2>
              <p className="text-muted-foreground">Usually within 24-48 hours</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-3">Best Way to Reach Us</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Email is the preferred channel for all requests. To help us resolve your issue faster,
            include your device type, browser name/version, tool URL, and a short description of
            the problem you encountered.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">We Can Help With</h2>
          <ul className="list-disc pl-6 text-muted-foreground leading-7 space-y-2 mb-4">
            <li>Tool-related bugs, incorrect output, or UI issues.</li>
            <li>Feature requests and suggestions for new tools.</li>
            <li>Business or partnership discussions.</li>
            <li>General website feedback and user experience improvements.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">Before You Contact</h2>
          <p className="text-muted-foreground leading-7 mb-4">
            Many temporary issues can be fixed by refreshing the page, clearing browser cache,
            or trying a different browser. If the problem continues, share clear reproduction
            steps so we can investigate quickly.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Important Note</h2>
          <p className="text-muted-foreground leading-7">
            Please do not send sensitive personal, financial, or confidential credentials by email.
            Use safe communication practices when sharing any sample data for debugging.
          </p>
        </div>
      </div>
    </section>
  );
}
