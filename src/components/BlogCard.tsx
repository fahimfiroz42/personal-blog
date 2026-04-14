import { BlogPost } from '@/types/blog';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export default function BlogCard({ post, isFeatured }: BlogCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl ${
        isFeatured ? 'md:grid md:grid-cols-2' : ''
      }`}
    >
      <div className={`aspect-video w-full bg-muted overflow-hidden ${isFeatured ? 'h-full' : ''}`}>
        <img
          src={`https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800`}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col justify-center">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {post.date}
          </div>
        </div>

        <h2 className={`mb-3 font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors ${
          isFeatured ? 'text-3xl lg:text-4xl' : 'text-xl'
        }`}>
          {post.title}
        </h2>

        <p className="mb-6 text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4" />
            {post.author}
          </div>
          <Link
            href={`/post/${post.id}`}
            className="flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
