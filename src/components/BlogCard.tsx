import { BlogPost } from '@/types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export default function BlogCard({ post, isFeatured }: BlogCardProps) {
  return (
    <Card
      className={`overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg group flex flex-col ${
        isFeatured ? 'md:flex-row gap-0' : 'h-full'
      }`}
    >
      <div className={`overflow-hidden relative ${isFeatured ? 'md:w-1/2 min-h-[300px]' : 'aspect-video'}`}>
        <img
          src={`https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800`}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isFeatured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      <div className={`flex flex-col p-6 lg:p-8 ${isFeatured ? 'md:w-1/2 justify-center' : 'flex-1'}`}>
        <div className="mb-4">
          <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px]">
            #{post.category}
          </Badge>
        </div>

        <h2 className={`font-heading font-bold leading-tight mb-4 text-foreground group-hover:text-primary transition-colors ${
          isFeatured ? 'text-3xl lg:text-5xl' : 'text-2xl'
        }`}>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h2>

        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 text-sm line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-bold text-foreground/80">{post.author}</span>
          </div>
          <Link
            href={`/post/${post.id}`}
            className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
