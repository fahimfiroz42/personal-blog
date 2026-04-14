'use client';

import { useState } from 'react';
import { posts } from '@/data/posts';
import BlogCard from './BlogCard';

export default function PostFilters() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Science' | 'German' | 'IELTS'>('All');

  const categories = ['All', 'Science', 'German', 'IELTS'] as const;

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-lg'
                : 'bg-secondary text-muted-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border text-muted-foreground">
            <p className="text-lg font-medium">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
