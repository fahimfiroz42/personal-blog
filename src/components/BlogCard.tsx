import { BlogPost } from '@/types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export default function BlogCard({ post, isFeatured }: BlogCardProps) {
  return (
    <article
      className={`maktub-card p-8 flex flex-col h-full bg-white dark:bg-[#1e1e1e] ${
        isFeatured ? 'md:grid md:grid-cols-2 gap-8' : ''
      }`}
    >
      <div className={`overflow-hidden mb-6 ${isFeatured ? 'md:mb-0 h-full' : 'aspect-[4/3]'}`}>
        <img
          src={`https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800`}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <Link href={`/category/${post.category.toLowerCase()}`} className="maktub-tag">
            #{post.category}
          </Link>
        </div>

        <h2 className={`font-heading font-bold leading-tight mb-4 text-[#111827] dark:text-white hover:text-primary transition-colors ${
          isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl'
        }`}>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h2>

        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 text-[15px] line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden border border-border">
              <img 
                src={`https://i.pravatar.cc/150?u=${post.author}`} 
                alt={post.author} 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[12px] font-bold text-foreground/80">{post.author}</span>
          </div>
          <Link
            href={`/post/${post.id}`}
            className="text-[11px] font-black uppercase tracking-tighter text-primary border-b-2 border-primary/20 hover:border-primary transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
