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

          <p className="text-muted-foreground leading-7 mb-6">
            Need support, feature request, or business inquiry? Reach us using the details below.
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
        </div>
      </div>
    </section>
  );
}
