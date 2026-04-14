'use client';

import { usePosts } from '@/context/PostContext';
import BlogCard from '@/components/BlogCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Mail, Send, ChevronDown, SearchX } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const { posts } = usePosts();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);
  
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
    // Simulate a network delay for a "premium" feel
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };
  
  if (posts.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-heading italic text-2xl">Loading Farsi&apos;s Blogs...</div>
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
    <div className="space-y-20">
      {/* Hero / Featured */}
      <section className="mb-20">
        <BlogCard post={featuredPost} isFeatured />
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedPosts.map((post) => (
          <div key={post.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BlogCard post={post} />
          </div>
        ))}
      </section>

      {/* Infinite Scroll Sentinel & Spinner */}
      <div ref={observerTarget} className="w-full flex justify-center py-10">
        {isLoadingMore && <LoadingSpinner />}
        {!isLoadingMore && visibleCount < regularPosts.length && (
           <div className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground/30 italic">
             Scroll for more stories
           </div>
        )}
        {!isLoadingMore && visibleCount >= regularPosts.length && regularPosts.length > 0 && (
           <div className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground/30 italic">
             End of Archive
           </div>
        )}
      </div>

      {/* Subscribe Section */}
      <section className="py-24 border-y border-border flex flex-col items-center text-center bg-white dark:bg-[#121212] rounded-[3rem] my-20">
        <div className="max-w-xl mx-auto px-4">
          <Mail className="h-10 w-10 text-primary mb-6 mx-auto" />
          <h2 className="text-4xl font-heading font-bold mb-4">Subscribe to <span className="text-primary italic">Farsi&apos;s Blogs</span></h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Get the latest educational stories, German tips, and IELTS strategies delivered right to your inbox.
          </p>
          <div className="flex w-full h-14 bg-muted border border-border p-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent px-6 text-sm focus:outline-none placeholder:italic"
            />
            <button className="bg-primary text-white px-8 h-full flex items-center gap-2 font-bold uppercase text-[12px] tracking-widest hover:opacity-90 transition-opacity">
              <span>Submit</span>
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
