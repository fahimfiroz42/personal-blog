'use client';

import React, { useState } from 'react';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, X } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  const { addPost } = usePosts();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Science' as 'Science' | 'German' | 'IELTS',
    excerpt: '',
    content: '',
    author: 'Admin',
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    await addPost(formData);
    router.push('/studio');
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/studio"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/studio"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all text-sm font-bold"
          >
            <X className="h-4 w-4" />
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all shadow-md"
          >
            <Save className="h-4 w-4" />
            Publish Post
          </button>
        </div>
      </div>

      <div className="bg-card border border-border p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold font-heading mb-8">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Post Title</label>
            <input
              type="text"
              required
              placeholder="e.g. The Future of AI in Modern Classrooms"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-primary focus:outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category</label>
              <select
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              >
                <option value="Science">Science Education</option>
                <option value="German">German Learning</option>
                <option value="IELTS">IELTS Preparation</option>
              </select>
            </div>
            <div className="space-y-2 flex items-center justify-center bg-secondary/30 rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className="font-bold text-sm">Mark as Featured Story</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Excerpt (Short Summary)</label>
            <textarea
              required
              rows={2}
              placeholder="A brief teaser to catch readers' attention..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 placeholder:italic focus:ring-2 focus:ring-primary focus:outline-none"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Content</label>
            <textarea
              required
              rows={12}
              placeholder="Write your masterpiece here..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-serif text-lg focus:ring-2 focus:ring-primary focus:outline-none"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
