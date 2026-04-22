'use client';

import { usePosts } from '@/context/PostContext';
import BlogCard from '@/components/BlogCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Mail, Send, ChevronDown, SearchX } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const { posts, isLoading } = usePosts();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);
  
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState('');

  const query = searchParams.get('s')?.toLowerCase();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && visibleCount < regularPosts.length) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, isLoadingMore, posts, query]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSubStatus('success');
        setSubMessage(data.message);
        setEmail('');
      } else {
        setSubStatus('error');
        setSubMessage(data.message);
      }
    } catch (err) {
      setSubStatus('error');
      setSubMessage('Something went wrong. Please try again.');
    }
  };

  // 1. First Loading Animation
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <LoadingSpinner className="scale-150" />
      </div>
    );
  }
  
  // 2. Database Connection Check
  if (posts.length === 0 && !isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center space-y-12 px-6 animate-in fade-in zoom-in duration-1000">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse -z-10" />
          <div className="h-24 w-24 bg-background border border-border/50 rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3">
            <Mail className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="space-y-4 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter text-foreground">Awaiting Connection</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Your premium archive is ready, but it needs to securely connect to your <span className="text-primary font-bold italic">MongoDB Atlas</span> cluster. 
          </p>
          <div className="p-6 bg-muted/30 border border-border/50 rounded-2xl text-left space-y-2 mt-8">
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action Required:</p>
             <p className="text-xs font-medium leading-relaxed">Ensure your current IP address is whitelisted in your MongoDB Network Access settings.</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <a 
            href="https://cloud.mongodb.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 h-14 rounded-2xl flex items-center justify-center font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] transition-all shadow-2xl"
          >
            Go to MongoDB Atlas
          </a>
          <button 
            onClick={() => window.location.reload()} 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all hover:tracking-[0.5em]"
          >
            Refresh Once Whitelisted
          </button>
        </div>
      </div>
    );
  }

  const allPosts = query 
    ? posts.filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query))
    : posts;

  if (query && allPosts.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center space-y-6">
        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
          <SearchX className="h-10 w-10 text-muted-foreground/40" />
        </div>
        <h2 className="text-3xl font-heading font-bold italic">Archive search: No results.</h2>
        <p className="text-muted-foreground max-w-sm">We couldn&apos;t find any stories matching &quot;{query}&quot;. Try a different keyword.</p>
        <button onClick={() => window.location.href = '/'} className="underline text-[10px] font-black uppercase tracking-widest text-primary">Clear Search</button>
      </div>
    );
  }

  const featuredPost = query ? allPosts[0] : (allPosts.find((p) => p.featured) || allPosts[0]);
  const regularPosts = allPosts.filter(p => p.id !== (featuredPost?.id || ''));
  const displayedPosts = regularPosts.slice(0, visibleCount);

  return (
    <div className="space-y-32 pb-20">
      {/* Premium Hero Section */}
      <section className="relative pt-20 overflow-x-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] blur-[120px] -z-10" />
        
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <Badge variant="outline" className="px-6 py-2 border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm bg-primary/5">
            The Journal of Excellence
          </Badge>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.9] max-w-5xl">
            Stories that <span className="text-primary italic">inspire</span> change.
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
            Exploring the intersection of science, languages, and exams through the lens of a passionate educator.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="h-12 w-12 border-4 border-background shadow-xl">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-left">
              <div className="text-[14px] font-black uppercase tracking-widest text-foreground">1.2k+ Readers</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Joined this month</div>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <BlogCard post={featuredPost} isFeatured />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight italic">The Archive.</h2>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">Curated stories for the curious mind</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 border-b border-border/50 pb-2">
             <span>Sort by:</span>
             <span className="text-foreground cursor-pointer hover:text-primary transition-colors">Latest First</span>
             <ChevronDown className="h-3 w-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {displayedPosts.map((post) => (
            <div key={post.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Scroll Sentinel & Spinner */}
      <div ref={observerTarget} className="w-full flex flex-col items-center justify-center py-20 space-y-6">
        {isLoadingMore ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="h-px w-24 bg-border/50" />
            {visibleCount < regularPosts.length ? (
               <div className="text-[10px] uppercase font-black tracking-[0.5em] text-muted-foreground/30 italic animate-pulse">
                 Keep scrolling for more
               </div>
            ) : regularPosts.length > 0 && (
               <div className="text-[10px] uppercase font-black tracking-[0.5em] text-muted-foreground/30 italic">
                 End of Archive
               </div>
            )}
          </>
        )}
      </div>

      {/* Subscribe Section */}
      <section className="relative mx-4 lg:mx-0">
        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-1 scale-105 blur-2xl -z-10" />
        <div className="py-20 border border-border/50 flex flex-col items-center text-center bg-white/50 dark:bg-black/50 backdrop-blur-2xl rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] -z-10" />
          
          <div className="max-w-2xl mx-auto px-8 relative z-10">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tight">
              Subscribe to <span className="text-primary italic">FARSI&apos;S BLOGS.</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-sm md:text-base font-medium leading-relaxed">
              Join 5,000+ subscribers who get our weekly digest of educational insights, language tips, and IELTS breakthroughs.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-lg mx-auto gap-3">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  disabled={subStatus === 'loading' || subStatus === 'success'}
                  className="w-full h-12 bg-background border border-border/50 pl-12 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:italic font-medium"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={subStatus === 'loading' || subStatus === 'success'}
                className="bg-primary text-white px-8 h-12 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-[0.15em] hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 disabled:opacity-50 disabled:hover:scale-100"
              >
                <span>{subStatus === 'loading' ? 'Joining...' : subStatus === 'success' ? 'Joined!' : 'Subscribe'}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            
            {subMessage && (
              <p className={`mt-4 text-xs font-bold animate-in fade-in slide-in-from-top-2 ${subStatus === 'success' ? 'text-primary' : 'text-destructive'}`}>
                {subMessage}
              </p>
            )}

            <p className="mt-6 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">
              Zero spam. Only value. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
