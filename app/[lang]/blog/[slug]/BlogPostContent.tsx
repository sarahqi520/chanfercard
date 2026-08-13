import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function BlogPostContent({
  dict,
  locale,
  title,
  date,
  author,
  body,
}: {
  dict: Dictionary;
  locale: Locale;
  title: string;
  date: string;
  author: string;
  body: string[];
}) {
  const blog = (dict as any).blog || {};
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: date,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "CHANFER" },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href={`/${locale}/blog`}
        className="text-blue-600 text-sm mb-6 inline-block"
      >
        {blog.backToList || "← Back to Blog"}
      </Link>
      <div className="text-sm text-gray-400 mb-2">
        {date} · {author}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
      <article className="prose max-w-none space-y-4">
        {body.map((html, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </article>
    </main>
  );
}
