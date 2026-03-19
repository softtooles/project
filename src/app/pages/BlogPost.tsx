import type { BlogPost as BlogPostRecord } from "@/app/data/blogPosts";
import { blogPosts } from "@/app/data/blogPosts";

export function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find((p: BlogPostRecord) => p.slug === slug);

  if (!post) {
    return (
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog post not found</h1>
            <p className="text-muted-foreground">The article you requested does not exist.</p>
          </div>
        </div>
      </section>
    );
  }

  // Related posts - same category
  const relatedPosts = blogPosts
    .filter((p: BlogPostRecord) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-semibold">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">{post.readTime} minute read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>Author: {post.author}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 border-t border-gray-700/50 pt-6">
            {post.tags.map((tag: string) => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-sm text-cyan-400 transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-8 md:p-10 mb-8">
          <div className="prose prose-invert max-w-none">
            {post.content.split("\n\n").map((paragraph: string, idx: number) => {
              // Check if it's a heading (starts with **)
              if (paragraph.startsWith("**") && paragraph.includes(":")) {
                return <h3 key={idx} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace(/\*\*/g, "")}</h3>;
              }

              // Check if it's a list (starts with -)
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n");
                return (
                  <ul key={idx} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                    {items.map((item: string, i: number) => (
                      <li key={i} className="leading-relaxed">
                        {item.replace("- ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Check if code block
              if (paragraph.startsWith("```")) {
                const lines = paragraph.split("\n");
                const lang = lines[0].replace("```", "");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre key={idx} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-4 overflow-x-auto">
                    <code className="text-sm text-cyan-300">{code}</code>
                  </pre>
                );
              }

              return (
                <p key={idx} className="text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Share & Author */}
        <div className="glass-panel rounded-2xl p-8 mb-8">
          <div className="border-b border-gray-700/50 pb-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://softtooles.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://softtooles.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Share on Facebook
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(`https://softtooles.com/blog/${post.slug}`)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Copy link
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About the author</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold">
                S
              </div>
              <div>
                <h4 className="font-semibold">{post.author}</h4>
                <p className="text-sm text-muted-foreground">
                  We build practical tools, educational content, and clean browser-based workflows for modern teams.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: BlogPostRecord) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="glass-panel premium-card rounded-2xl p-6 hover:border-cyan-500/50 transition-colors"
                >
                  <p className="text-xs uppercase tracking-wide text-cyan-600 dark:text-cyan-300 mb-3">
                    {relatedPost.category}
                  </p>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-cyan-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-6 line-clamp-3">{relatedPost.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
