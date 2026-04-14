'use client';

import { usePosts } from '@/context/PostContext';
import { Rss, ArrowRight } from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import Link from 'next/link';

export default function Footer() {
  const { posts } = usePosts();
  const latestPosts = posts.slice(0, 3);
  const categories = ['Science', 'German', 'IELTS', 'Technology', 'Education', 'Travel'];

  return (
    <footer className="bg-white dark:bg-[#121212] border-t border-border pt-20 pb-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Latest Articles */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
            Latest Articles
          </h3>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <div key={post.id} className="flex gap-4 group cursor-pointer">
                <div className="h-16 w-16 bg-muted shrink-0 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${post.id}`} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </h4>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Tag Cloud */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
            Tag Cloud
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={`/category/${cat.toLowerCase()}`}
                className="px-3 py-1 bg-muted border border-border text-[11px] font-bold text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all rounded-sm"
              >
                #{cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Follow Me */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
            Follow Me
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="flex items-center justify-center p-3 bg-[#3b5998] text-white hover:opacity-90 transition-opacity">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center justify-center p-3 bg-[#1da1f2] text-white hover:opacity-90 transition-opacity">
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center justify-center p-3 bg-[#e1306c] text-white hover:opacity-90 transition-opacity">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center justify-center p-3 bg-[#ff6600] text-white hover:opacity-90 transition-opacity">
              <Rss className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 4: About Me */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
            About Me
          </h3>
          <div className="flex flex-col items-center text-center italic">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20 mb-4 p-1">
              <img src="https://i.pravatar.cc/300?u=admin" alt="Admin" className="h-full w-full rounded-full object-cover" />
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              &quot;Farsi&apos;s Blogs&quot; is your home for high-quality educational content about Science, Languages, and Global Education.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 pt-10 border-t border-border/50 text-center flex flex-col items-center gap-4">
        <div className="text-4xl font-heading font-bold text-foreground opacity-50">Farsi&apos;s Blogs.</div>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-black">
          &copy; 2026 Farsi&apos;s Blogs. All Rights Reserved.
        </p>
        <Link href="/studio" className="text-[10px] opacity-10 hover:opacity-50 transition-opacity">Studio Access</Link>
      </div>
    </footer>
  );
}
