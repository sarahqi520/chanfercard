import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type PostSummary = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

export default function BlogListContent({
  dict,
  locale,
  posts,
}: {
  dict: Dictionary;
  locale: Locale;
  posts: PostSummary[];
}) {
  const blog = (dict as any).blog || {};
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-3">
        {blog.heading || "Card Packaging Blog"}
      </h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        {blog.subheading ||
          "Practical guides on card packaging machines and production lines."}
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block border rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="text-sm text-gray-400 mb-2">{post.date}</div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
            <span className="text-blue-600 text-sm">
              {blog.readMore || "Read more →"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
