'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';

interface PostContextType {
  posts: BlogPost[];
  isLoading: boolean;
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (postData: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    // For now, updatePost is not fully implemented on server, but we follow the pattern
    console.log('Update not yet implemented on server side persistence');
  };

  return (
    <PostContext.Provider value={{ posts, isLoading, addPost, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}
