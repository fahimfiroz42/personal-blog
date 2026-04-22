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
    <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-950 p-6 md:p-12 lg:p-16 rounded-[2.5rem] border border-border/50 shadow-xl overflow-hidden">
          <article className="space-y-12 max-w-[680px] mx-auto break-words">
            
            {/* Post Header */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="mb-4">
                <span className="maktub-tag">#{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight break-words">
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
            <div className="aspect-[16/9] bg-muted overflow-hidden rounded-2xl">
              <img 
                src={post.imageUrl || `https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1200`} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none font-serif text-[17px] leading-relaxed text-foreground/80 space-y-8">
              <p className="text-xl md:text-2xl font-medium italic text-foreground leading-normal border-l-4 border-primary/20 pl-6 my-10 bg-muted/30 p-6 md:p-8 rounded-r-xl break-words">
                {post.excerpt}
              </p>
              
              <div 
                className="rich-content leading-[1.8] text-foreground/90 break-words"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <style jsx global>{`
                .rich-content {
                  font-size: 1.15rem;
                  word-break: break-word;
                  overflow-wrap: break-word;
                }
                .rich-content h1 { 
                  font-size: 3rem; 
                  font-weight: 900; 
                  margin-top: 3rem;
                  margin-bottom: 1.5rem; 
                  letter-spacing: -0.02em;
                  line-height: 1.1;
                }
                .rich-content h2 { 
                  font-size: 2.25rem; 
                  font-weight: 800; 
                  margin-top: 2.5rem;
                  margin-bottom: 1.25rem; 
                  letter-spacing: -0.01em;
                  line-height: 1.2;
                }
                .rich-content h3 { 
                  font-size: 1.75rem; 
                  font-weight: 800; 
                  margin-top: 2rem;
                  margin-bottom: 1rem; 
                  color: var(--primary);
                }
                .rich-content p { 
                  margin-bottom: 1.75rem; 
                }
                .rich-content b, .rich-content strong {
                  font-weight: 800;
                  color: var(--foreground);
                }
                .rich-content ul { 
                  list-style-type: none; 
                  margin-left: 0; 
                  margin-bottom: 2rem; 
                  padding-left: 1.5rem;
                  border-left: 2px solid var(--primary/10);
                }
                .rich-content ul li {
                  position: relative;
                  margin-bottom: 0.75rem;
                }
                .rich-content ul li::before {
                  content: "";
                  position: absolute;
                  left: -1.5rem;
                  top: 0.75rem;
                  width: 6px;
                  height: 6px;
                  background: var(--primary);
                  border-radius: full;
                }
                .rich-content ol { 
                  list-style-type: decimal; 
                  margin-left: 1.5rem; 
                  margin-bottom: 2rem; 
                }
                .rich-content blockquote { 
                  border-left: 4px solid var(--primary); 
                  padding: 2rem; 
                  font-style: italic; 
                  margin: 3rem 0; 
                  background: var(--primary/5);
                  border-radius: 0 2rem 2rem 0;
                  font-size: 1.5rem;
                  line-height: 1.5;
                }
                .rich-content pre { 
                  background: #1a1a1a; 
                  color: #eee;
                  padding: 2rem; 
                  border-radius: 1.5rem; 
                  overflow-x: auto; 
                  margin-bottom: 2rem; 
                  font-family: monospace;
                  font-size: 0.9rem;
                  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
                }
                .rich-content a { 
                  color: var(--primary); 
                  text-decoration: none;
                  font-weight: 700;
                  border-bottom: 2px solid var(--primary/20);
                  transition: all 0.2s;
                }
                .rich-content a:hover {
                  border-bottom-color: var(--primary);
                  background: var(--primary/5);
                }
              `}</style>

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
