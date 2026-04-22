'use client';

import { usePosts } from '@/context/PostContext';
import { Rss, ArrowRight } from 'lucide-react';
import { FacebookIcon, GithubIcon, LinkedInIcon, WhatsappIcon } from '@/components/Icons';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Footer() {
  const { posts } = usePosts();
  const latestPosts = posts.slice(0, 3);
  const categories = ['Science', 'German', 'IELTS', 'Technology', 'Education', 'Travel'];

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 mt-24">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* Column 1: Latest Articles */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-foreground">
              Briefing
            </h3>
            <Separator className="flex-1 bg-border/60" />
          </div>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <div key={post.id} className="flex gap-4 group cursor-pointer">
                <div className="h-14 w-14 bg-muted shrink-0 overflow-hidden rounded-lg">
                  <img 
                    src={post.imageUrl || `https://i.pravatar.cc/100?u=${post.id}`} 
                    alt="" 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://i.pravatar.cc/100?u=${post.id}`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </h4>
                  <p className="text-[9px] uppercase font-bold text-muted-foreground mt-2 tracking-widest">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Tag Cloud */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-foreground">
              Taxonomy
            </h3>
            <Separator className="flex-1 bg-border/60" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge key={cat} variant="outline" className="px-3 py-1 bg-card border-border text-[10px] font-bold text-muted-foreground hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all rounded-md cursor-pointer">
                #{cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Column 3: Follow Me */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-foreground">
              Network
            </h3>
            <Separator className="flex-1 bg-border/60" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <a href="https://www.facebook.com/fahim.firozfarsi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-sm">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/fahim-firoz-farsi/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-sm">
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href="https://github.com/fahimfiroz42" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-sm">
              <GithubIcon className="h-4 w-4" />
            </a>
            <a href="https://wa.me/8801720885856" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary transition-colors shadow-sm">
              <WhatsappIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 4: About Me */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-foreground">
              Identity
            </h3>
            <Separator className="flex-1 bg-border/60" />
          </div>
          <div className="flex flex-col items-center text-center italic">
            <Avatar className="h-20 w-20 mb-6 border-2 border-muted p-1">
              <AvatarImage src="/me.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[200px]">
              &quot;Farsi&apos;s Blogs&quot; is your home for high-quality educational content about Science, Languages, and Global Education.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24 pt-12 border-t border-border/40 text-center flex flex-col items-center gap-6">
        <div className="text-4xl font-heading font-bold text-foreground hover:opacity-100 transition-opacity tracking-tighter">FARSI&apos;S BLOGS<span className="text-primary italic">.</span></div>
        <div className="flex items-center gap-4 overflow-x-auto max-w-full text-[9px] font-black uppercase tracking-[.2em] text-muted-foreground/60 whitespace-nowrap">
          <span>&copy; 2026</span>
          <Separator orientation="vertical" className="h-3 bg-border" />
          <span>All Rights Reserved</span>
          <Separator orientation="vertical" className="h-3 bg-border" />
          <Link href="/studio" className="hover:text-primary hover:opacity-100 transition-all opacity-40">System Access</Link>
        </div>
      </div>
    </footer>
  );
}
