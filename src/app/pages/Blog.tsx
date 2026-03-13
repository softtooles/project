import Image from "next/image";

const posts = [
  {
    title: "How To Speed Up Daily Dev Workflow",
    excerpt: "Practical tricks to save time with formatting, encoding, and conversion tools.",
    date: "March 2026",
  },
  {
    title: "Privacy-First Tooling In Modern Web",
    excerpt: "Why local browser processing matters for developers and teams.",
    date: "March 2026",
  },
  {
    title: "Designing Premium Utility Dashboards",
    excerpt: "A look into motion, hierarchy, and card systems for better productivity UX.",
    date: "March 2026",
  },
];

export function Blog() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-muted-foreground">
            Updates, tutorials, and product design insights from Softtooles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.title} className="glass-panel premium-card rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-cyan-600 dark:text-cyan-300 mb-3">{post.date}</p>
              <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
              <p className="text-muted-foreground text-sm leading-6">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
