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
          <p className="text-muted-foreground leading-7 mb-4">
            Softtooles is a modern developer tools platform built for speed, privacy, and clean
            user experience. We design utility tools that solve daily development problems in seconds.
          </p>
          <p className="text-muted-foreground leading-7 mb-4">
            Our focus is simple: fast loading, mobile-friendly interfaces, and reliable results with
            no unnecessary complexity.
          </p>
          <p className="text-muted-foreground leading-7">
            Every tool is crafted with thoughtful UX, premium visuals, and practical workflows for
            developers, students, and technical teams.
          </p>
        </div>
      </div>
    </section>
  );
}
