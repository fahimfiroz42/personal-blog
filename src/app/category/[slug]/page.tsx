'use client';

import React from 'react';
import { usePosts } from '@/context/PostContext';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';
import { useSearchParams, notFound } from 'next/navigation';
import Pagination from '@/components/Pagination';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const searchParams = useSearchParams();
  const { posts, isLoading } = usePosts();
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const postsPerPage = 6;
  
  if (isLoading) {
    return <div className="p-20 text-center animate-pulse italic font-heading text-2xl">Filtering Stories...</div>;
  }

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const filteredPosts = posts.filter(
    (p) => p.category.toLowerCase() === slug.toLowerCase()
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (filteredPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center space-y-6">
        <h1 className="text-6xl font-heading font-black opacity-10 uppercase tracking-tighter">Empty Archive</h1>
        <p className="text-muted-foreground italic text-lg">No posts were found under the &quot;{categoryName}&quot; category.</p>
        <div className="pt-10">
          <a href="/" className="bg-primary text-white px-8 py-3 font-bold uppercase text-xs tracking-widest">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-16 border-b border-border pb-10">
        <h1 className="text-5xl font-heading font-bold mb-4">
          Category: <span className="text-primary italic">{categoryName}</span>
        </h1>
        <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">
          Discover all stories about {categoryName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {displayedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            baseUrl={`/category/${slug}`} 
          />
        </div>
        <div className="lg:col-span-4">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
}
