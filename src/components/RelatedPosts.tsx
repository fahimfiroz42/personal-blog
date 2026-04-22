'use client';

import { usePosts } from '@/context/PostContext';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RelatedPostsProps {
  currentCategoryId: string;
  currentPostId: string;
}

export default function RelatedPosts({ currentCategoryId, currentPostId }: RelatedPostsProps) {
  const { posts } = usePosts();
  
  // Logical Related: Same category, excluding current
  const related = posts
    .filter(p => p.category === currentCategoryId && p.id !== currentPostId)
    .slice(0, 4);

  // If not enough in same category, fill with others
  const fillNeeded = 4 - related.length;
  if (fillNeeded > 0) {
    const others = posts
      .filter(p => p.category !== currentCategoryId && p.id !== currentPostId)
      .slice(0, fillNeeded);
    related.push(...others);
  }

  // Find Indices for Prev/Next
  const currentIndex = posts.findIndex(p => p.id === currentPostId);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="mt-20 space-y-16">
      {/* Related Grid */}
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground">
            Continue Reading
          </h3>
          <div className="h-px flex-1 bg-border/40"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {related.map((post) => (
            <div key={post.id} className="group cursor-pointer space-y-4">
              <div className="aspect-[4/5] bg-muted overflow-hidden rounded-2xl border border-border/50">
                <img 
                  src={post.imageUrl || `https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=300`} 
                  alt={post.title} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-widest px-2 py-0">#{post.category}</Badge>
                <h4 className="text-[14px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequential Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border/40 overflow-hidden">
        {/* Previous Post */}
        {prevPost ? (
          <Link href={`/post/${prevPost.id}`} className="group flex items-center gap-8 py-12 pr-8 border-r border-border/40 hover:bg-muted/30 transition-colors">
            <div className="h-20 w-20 bg-muted shrink-0 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
               <img 
                 src={prevPost.imageUrl || `https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=200`} 
                 alt="" 
                 className="h-full w-full object-cover" 
               />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <ChevronLeft className="h-3 w-3" /> Previous Story
              </p>
              <h4 className="text-[15px] font-bold font-heading leading-tight line-clamp-2">{prevPost.title}</h4>
            </div>
          </Link>
        ) : <div className="py-12 border-r border-border/40"></div>}

        {/* Next Post */}
        {nextPost ? (
          <Link href={`/post/${nextPost.id}`} className="group flex flex-row-reverse items-center text-right gap-8 py-12 pl-8 hover:bg-muted/30 transition-colors">
            <div className="h-20 w-20 bg-muted shrink-0 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
               <img 
                 src={nextPost.imageUrl || `https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=200`} 
                 alt="" 
                 className="h-full w-full object-cover" 
               />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-end gap-2">
                Next Story <ChevronRight className="h-3 w-3" />
              </p>
              <h4 className="text-[15px] font-bold font-heading leading-tight line-clamp-2">{nextPost.title}</h4>
            </div>
          </Link>
        ) : <div className="py-12 text-center text-muted-foreground/30 italic text-xs flex items-center justify-center">End of Archive</div>}
      </div>
    </div>
  );
}
