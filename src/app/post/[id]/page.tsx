import { posts } from '@/data/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | EDUBlog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
    },
  };
}

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    category: post.category,
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl leading-relaxed mb-6 font-medium">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-wrap leading-relaxed text-foreground/80">
          {post.content}
        </div>
      </div>
    </div>
  );
}
