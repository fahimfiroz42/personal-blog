'use client';

import React, { useState } from 'react';
import { usePosts } from '@/context/PostContext';
import { Plus, Trash2, Edit, ExternalLink, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function StudioDashboard() {
  const { posts, deletePost, isLoading } = usePosts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-heading italic text-2xl">Loading Studio...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center">
        <h1 className="text-3xl font-heading font-bold mb-8 italic">Farsi&apos;s Blogs Studio Access</h1>
        <div className="bg-card border border-border p-8 rounded-3xl shadow-xl space-y-6">
          <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Enter Secret Key</p>
          <input
            type="password"
            placeholder="Secret Key"
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-center focus:ring-2 focus:ring-primary focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (password === 'admin123') setIsAuthenticated(true);
              else alert('Incorrect Secret Key');
            }}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold font-heading flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Content Studio
          </h1>
          <p className="text-muted-foreground mt-2">Manage your educational posts and track your reach.</p>
        </div>
        <Link
          href="/studio/new"
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Create New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Posts</p>
          <p className="text-4xl font-bold mt-2">{posts.length}</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Categories</p>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Sync Status</p>
          <p className="text-sm font-bold mt-2 text-primary flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Server Persistent (JSON)
          </p>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground uppercase text-xs font-bold tracking-widest">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-card-foreground line-clamp-1">{post.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/post/${post.id}`}
                        target="_blank"
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="View Live"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                    No posts found. Time to create your first masterpiece!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
