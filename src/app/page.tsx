'use client';

import { usePosts } from '@/context/PostContext';
import BlogCard from '@/components/BlogCard';
import { Mail, Send } from 'lucide-react';
import React from 'react';

export default function Home() {
  const { posts } = usePosts();
  
  if (posts.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-heading italic text-2xl">Loading Farsi&apos;s Blogs...</div>
      </div>
    );
  }

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter(p => p.id !== featuredPost.id);

  return (
    <div className="space-y-20">
      {/* Hero / Featured */}
      <section className="mb-20">
        <BlogCard post={featuredPost} isFeatured />
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* We can intersperse posts or just list them */}
        {regularPosts.map((post, idx) => (
          <div key={post.id} className={idx === 1 ? 'lg:col-span-1' : ''}>
            <BlogCard post={post} />
          </div>
        ))}
      </section>

      {/* Subscribe Section */}
      <section className="py-20 border-y border-border flex flex-col items-center text-center bg-white dark:bg-[#1e1e1e]">
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
          <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-50">
            {/* Social icons again here if needed, keeping it minimalist */}
          </div>
        </div>
      </section>

      {/* "Masonry" effect demo - just more posts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* If we had more posts, we'd continue here */}
      </section>
      
      {/* Pagination */}
      <div className="flex justify-center mt-20">
        <button className="bg-primary text-white inline-flex items-center justify-center px-10 py-4 font-bold uppercase tracking-[.2em] text-[11px] hover:scale-105 transition-transform">
          Next Posts
        </button>
      </div>
    </div>
  );
}
