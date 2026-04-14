'use client';

import { usePosts } from '@/context/PostContext';
import { notFound } from 'next/navigation';
import BlogSidebar from '@/components/BlogSidebar';
import AuthorBox from '@/components/AuthorBox';
import RelatedPosts from '@/components/RelatedPosts';
import CommentsSection from '@/components/Comments';
import { Calendar, Clock, Mail, ArrowRight } from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import Link from 'next/link';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { posts } = usePosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    if (posts.length > 0) notFound();
    return <div className="p-20 text-center animate-pulse">Loading Story...</div>;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    category: post.category,
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <article className="space-y-12">
            
            {/* Post Header */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="mb-4">
                <span className="maktub-tag">#{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-6">
                <span>By {post.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] bg-muted overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1200`} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none font-serif text-[17px] leading-relaxed text-foreground/80 space-y-8">
              <p className="text-2xl font-medium italic text-foreground leading-normal border-l-4 border-primary/20 pl-6 my-10 bg-muted/30 p-8">
                {post.excerpt}
              </p>
              
              <div className="markdown-content whitespace-pre-wrap leading-loose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Inner Image Section Example */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
                <div className="aspect-video bg-muted"></div>
                <div className="aspect-video bg-muted"></div>
                <div className="aspect-video bg-muted"></div>
              </div>

              <div className="italic p-8 border border-border/50 text-center text-sm font-medium">
                &quot;The more you read, the more things you will know. The more you learn, the more places you'll go.&quot;
              </div>
            </div>

            {/* Social Share Bottom */}
            <div className="flex items-center gap-4 pt-10 border-t border-border/50">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-4">Share this:</span>
              <div className="flex gap-2">
                <button className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"><FacebookIcon className="h-4 w-4" /></button>
                <button className="h-8 w-8 rounded-full bg-sky-400 text-white flex items-center justify-center hover:scale-110 transition-transform"><TwitterIcon className="h-4 w-4" /></button>
                <button className="h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform"><InstagramIcon className="h-4 w-4" /></button>
                <button className="h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:scale-110 transition-transform"><Mail className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Author Section */}
            <AuthorBox author={post.author} />

            {/* Next Post Navigation */}
            {posts.findIndex(p => p.id === post.id) < posts.length - 1 && (
              <div className="pt-20 border-t border-border/50">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-4 text-center">Next Story</p>
                <Link 
                  href={`/post/${posts[posts.findIndex(p => p.id === post.id) + 1].id}`}
                  className="group block text-center space-y-4"
                >
                  <h2 className="text-3xl md:text-5xl font-heading font-bold group-hover:text-primary transition-colors leading-tight max-w-2xl mx-auto">
                    {posts[posts.findIndex(p => p.id === post.id) + 1].title}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                    Read the story <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </div>
            )}

            {/* Related Posts */}
            <RelatedPosts currentCategoryId={post.category} currentPostId={post.id} />

            {/* Comments Area */}
            <CommentsSection postId={post.id} />

          </article>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 mt-20 lg:mt-0">
          <BlogSidebar />
        </div>

      </div>
    </div>
  );
}
