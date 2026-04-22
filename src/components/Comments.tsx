'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({ author: '', email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/comments`;

  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_URL}/${postId}`);
      const data = await res.json();
      const normalizedData = Array.isArray(data) 
        ? data.map((c: any) => ({ ...c, id: c._id || c.id || Math.random().toString() })) 
        : [];
      setComments(normalizedData);
    } catch (error) {
      console.error('Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.content) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, postId }),
      });
      
      if (res.ok) {
        const newComment = await res.json();
        // Map _id to id for consistency
        const processedComment = { ...newComment, id: newComment._id };
        setComments([processedComment, ...comments]);
        setFormData({ author: '', email: '', content: '' });
      }
    } catch (error) {
      console.error('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-24 space-y-16 animate-in fade-in duration-700">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground">
            {comments.length} Comments
          </h3>
          <div className="h-px flex-1 bg-border/40"></div>
          <MessageSquare className="h-4 w-4 text-muted-foreground/40" />
        </div>
        
        {isLoading ? (
          <div className="py-10 text-center text-muted-foreground italic text-sm">Loading discussion...</div>
        ) : (
          <div className="space-y-10">
            {comments.map((comment) => (
              <div key={comment.id} className="group flex gap-6 pb-10 border-b border-border/40 last:border-none transition-opacity">
                <Avatar className="h-12 w-12 border border-border/50">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${comment.author}`} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{comment.author}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">{comment.date}</span>
                  </div>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">
                    {comment.content}
                  </p>
                  <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                    Reply
                  </button>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="py-12 text-center border-2 border-dashed border-border rounded-3xl">
                <p className="text-sm text-muted-foreground italic">No comments yet. Start the conversation!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Card className="p-8 lg:p-12 bg-card border-border rounded-[2.5rem] shadow-sm">
        <div className="space-y-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-heading font-bold tracking-tight">Leave a Reply</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.1em]">Public Discussion &bull; No Account Required</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Identity</label>
                <Input 
                  required
                  placeholder="Full Name *" 
                  className="h-14 bg-muted/20 border-border rounded-xl px-6 focus-visible:ring-primary"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Electronic Mail</label>
                <Input 
                  required
                  type="email" 
                  placeholder="Email Address *" 
                  className="h-14 bg-muted/20 border-border rounded-xl px-6 focus-visible:ring-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Message</label>
              <Textarea 
                required
                rows={6} 
                placeholder="Share your thoughts or ask a question..." 
                className="bg-muted/20 border-border rounded-2xl px-8 py-6 text-[15px] font-medium placeholder:italic focus-visible:ring-primary min-h-[150px]"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-14 px-12 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:scale-105 transition-transform gap-2"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
