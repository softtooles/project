import Image from "next/image";
import { blogPosts } from "../data/blogPosts";
import { useState } from "react";

export function Blog({ selectedTag }: { selectedTag?: string }) {
  const [filterTag, setFilterTag] = useState(selectedTag || "");

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();

  // Filter posts based on selected tag
  const filteredPosts = filterTag
    ? blogPosts.filter((post) => post.tags.includes(filterTag))
    : blogPosts;

  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-muted-foreground">
            Read long-form tutorials, implementation guides, and practical tool breakdowns from Softtooles. {filteredPosts.length} posts available.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="glass-panel rounded-2xl p-6 mb-8">
          <p className="text-sm font-semibold mb-4">Filter posts by tag:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterTag("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !filterTag
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              All posts ({blogPosts.length})
            </button>
            {allTags.map((tag) => {
              const count = blogPosts.filter((post) => post.tags.includes(tag)).length;
              return (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterTag === tag
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  #{tag} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="glass-panel premium-card rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 group"
              >
                <div className="flex items-start justify-between mb-3 gap-2">
                  <p className="text-xs uppercase tracking-wide text-cyan-600 dark:text-cyan-300 font-semibold">
                    {post.category}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {post.readTime} min read
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm leading-6 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800/50 text-cyan-400 px-2 py-1 rounded"
                      onClick={(e) => {
                        e.preventDefault();
                        setFilterTag(tag);
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{post.tags.length - 2} more
                    </span>
                  )}
                </div>

                <div className="border-t border-gray-700/50 pt-4">
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No posts found for the "{filterTag}" tag.
            </p>
            <button
              onClick={() => setFilterTag("")}
              className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors font-medium"
            >
              View all posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
