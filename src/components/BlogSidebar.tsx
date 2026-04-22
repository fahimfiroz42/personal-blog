'use client';

import { usePosts } from '@/context/PostContext';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import { Rss, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function BlogSidebar() {
  const { posts } = usePosts();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [adSettings, setAdSettings] = useState({
    tag: 'Partner Story',
    title: 'Your Brand could be showcased here.',
    buttonText: 'Collaborate',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926'
  });

  const recentPosts = posts.slice(0, 4);
  const categories = ['Science', 'German', 'IELTS', 'Education', 'Technology'];

  useEffect(() => {
    fetch('http://localhost:5000/api/settings/ad')
      .then(res => res.json())
      .then(data => setAdSettings(data))
      .catch(err => console.error('Failed to load ad settings'));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?s=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="space-y-12 h-fit mb-20 lg:mb-0">
      {/* Widget: Search */}
      <form onSubmit={handleSearch} className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search articles..." 
          className="pl-10 h-14 bg-card border-border focus-visible:ring-primary rounded-xl text-sm font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Widget: Recent Posts */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
            Latest Stories
          </h3>
          <Separator className="flex-1 bg-border/60" />
        </div>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="flex gap-4 group cursor-pointer">
              <div className="h-16 w-16 bg-muted shrink-0 overflow-hidden rounded-xl border border-border/40">
                <img 
                  src={post.imageUrl || `https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=150`} 
                  alt={post.title} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-[9px] uppercase font-black text-muted-foreground mt-2 tracking-widest">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Widget: Advertising (Workable) */}
      <Card 
        className="group relative bg-zinc-900 border-none overflow-hidden rounded-[2rem] shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => adSettings.link !== '#' && window.open(adSettings.link, '_blank')}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundImage: `url(${adSettings.imageUrl})` }}
        ></div>
        <div className="relative aspect-[3/4] flex flex-col items-center justify-center text-zinc-100 p-10 text-center">
          <Badge className="mb-6 bg-white/10 hover:bg-white/20 text-white border-0 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            {adSettings.tag}
          </Badge>
          <p className="text-3xl font-heading font-bold mb-4 leading-tight italic">
            {adSettings.title}
          </p>
          <Separator className="w-12 bg-white/40 mb-6" />
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">
            {adSettings.buttonText} <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </Card>

      {/* Widget: Social */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
            Stay Connected
          </h3>
          <Separator className="flex-1 bg-border/60" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[FacebookIcon, TwitterIcon, InstagramIcon, Rss].map((Icon, i) => (
            <a key={i} href="#" className="flex items-center justify-center p-3.5 bg-card border border-border rounded-xl text-muted-foreground hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all shadow-sm">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Widget: Tag Cloud */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
            Taxonomy
          </h3>
          <Separator className="flex-1 bg-border/60" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${cat.toLowerCase()}`}>
              <Badge variant="outline" className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-all bg-card rounded-lg">
                #{cat}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
