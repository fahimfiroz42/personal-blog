'use client';

import { usePosts } from '@/context/PostContext';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import { Rss, Search } from 'lucide-react';
import Link from 'next/link';

export default function BlogSidebar() {
  const { posts } = usePosts();
  const recentPosts = posts.slice(0, 4);
  const categories = ['Science', 'German', 'IELTS', 'Education', 'Technology'];

  return (
    <aside className="space-y-12 h-fit">
      {/* Widget: Recent Posts */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Recent posts
        </h3>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-4 group cursor-pointer">
              <div className="h-14 w-14 bg-muted shrink-0 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${post.id}`} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                </h4>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Widget: Social */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Social
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <a href="#" className="flex items-center justify-center p-3 bg-[#111] text-white hover:bg-primary transition-colors">
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center justify-center p-3 bg-[#111] text-white hover:bg-primary transition-colors">
            <TwitterIcon className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center justify-center p-3 bg-[#111] text-white hover:bg-primary transition-colors">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center justify-center p-3 bg-[#111] text-white hover:bg-primary transition-colors">
            <Rss className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Widget: Tag Cloud */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Tag Cloud
        </h3>
        <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-widest">
          {categories.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${cat.toLowerCase()}`}
              className="px-2 py-1 text-muted-foreground border-b border-border hover:text-primary hover:border-primary transition-all"
            >
              #{cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Widget: Advertising */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Advertising
        </h3>
        <div className="aspect-[3/4] bg-[#333755] flex flex-col items-center justify-center text-white p-8 text-center italic">
          <p className="text-2xl font-heading mb-2">Advertising</p>
          <p className="text-xs opacity-50 uppercase tracking-widest font-black">Area</p>
        </div>
      </div>
    </aside>
  );
}
