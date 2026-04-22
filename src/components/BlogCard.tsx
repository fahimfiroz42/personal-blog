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
      className={`group relative overflow-hidden p-0 border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col ${
        isFeatured ? 'md:flex-row gap-0 border-none bg-transparent backdrop-blur-none shadow-none hover:shadow-none hover:translate-y-0' : 'h-full'
      }`}
    >
      <div className={`overflow-hidden relative rounded-t-xl ${isFeatured ? 'md:w-2/5 min-h-[300px] md:min-h-[450px] rounded-3xl shadow-2xl' : 'aspect-[16/10]'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <img
          src={post.imageUrl || `https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800`}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800';
          }}
        />
        {isFeatured && (
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
              Featured Story
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white backdrop-blur-md border-white/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
              #{post.category}
            </Badge>
          </div>
        )}
        {!isFeatured && (
          <Badge className="absolute top-4 right-4 z-20 bg-black/50 text-white backdrop-blur-md border-none px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
            {post.category}
          </Badge>
        )}
      </div>

      <div className={`flex flex-col p-8 lg:p-10 relative z-20 ${isFeatured ? 'md:w-3/5 md:-ml-20 md:my-12 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl justify-center' : 'flex-1 -mt-6 bg-card rounded-b-xl border-x border-b border-border/50'}`}>
        {!isFeatured && (
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-primary/70 mb-4">
             <span>{post.date}</span>
             <span className="h-1 w-1 rounded-full bg-border" />
             <span>5 min read</span>
          </div>
        )}

        {isFeatured && (
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">
             <Calendar className="h-3 w-3" />
             <span>{post.date}</span>
             <span className="h-4 w-px bg-border" />
             <Clock className="h-3 w-3" />
             <span>12 min read</span>
          </div>
        )}

        <h2 className={`font-heading font-bold leading-tight mb-6 text-foreground group-hover:text-primary transition-colors duration-300 ${
          isFeatured ? 'text-4xl lg:text-6xl tracking-tight' : 'text-2xl tracking-tight'
        }`}>
          <Link href={`/post/${post.id}`} className="hover:underline decoration-primary/30 underline-offset-8">
            {post.title}
          </Link>
        </h2>

        <p className={`text-muted-foreground leading-relaxed mb-8 font-medium ${isFeatured ? 'text-lg lg:text-xl line-clamp-4' : 'text-sm line-clamp-3'}`}>
          {post.excerpt}
        </p>

        <div className={`mt-auto flex items-center justify-between pt-6 border-t border-border/50 ${isFeatured ? 'border-none' : ''}`}>
          <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm scale-110" />
                <Avatar className="h-10 w-10 border-2 border-white dark:border-black shadow-lg relative z-10">
                  <AvatarImage src="/me.png" />
                  <AvatarFallback className="bg-muted text-[10px] font-black">{post.author[0]}</AvatarFallback>
                </Avatar>
              </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black uppercase tracking-widest text-foreground">{post.author}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Verified Author</span>
            </div>
          </div>
          <Link
            href={`/post/${post.id}`}
            className="group/btn h-12 w-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-xl"
          >
            <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}


