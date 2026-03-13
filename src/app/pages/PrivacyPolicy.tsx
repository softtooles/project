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
          <p className="text-muted-foreground leading-7 mb-4">
            We prioritize user privacy. Most tools run locally in your browser and do not upload
            your input data to external servers.
          </p>
          <p className="text-muted-foreground leading-7 mb-4">
            We may collect anonymous analytics to improve performance and user experience.
          </p>
          <p className="text-muted-foreground leading-7">
            By using this website, you agree to this policy and any future updates.
          </p>
        </div>
      </div>
    </section>
  );
}
