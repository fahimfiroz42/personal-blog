'use client';

import React, { useState } from 'react';
import { usePosts } from '@/context/PostContext';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, X, Trash2, ImagePlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { cn } from '../../../lib/utils';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'code-block'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'link', 'code-block',
];

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
    image: '',
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    await addPost(formData);
    router.push('/studio');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link 
          href="/studio" 
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-muted-foreground hover:text-foreground w-fit")}
        >
          <ChevronLeft className="h-4 w-4" />
          Archive Dashboard
        </Link>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link 
            href="/studio" 
            className={cn(buttonVariants({ variant: "outline" }), "flex-1 md:flex-none rounded-xl border-border h-10 px-6")}
          >
            Cancel
          </Link>
          <Button onClick={handleSubmit} className="flex-[2] md:flex-none rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-8 font-bold shadow-xl gap-2 h-10 hover:scale-[1.02] transition-transform">
            <Save className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-border bg-card shadow-2xl overflow-hidden p-6 md:p-12">
        <CardHeader className="px-0 pt-0 pb-8 md:pb-10 space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-heading font-black tracking-tighter">Draft a New Story</CardTitle>
          <CardDescription className="text-sm font-medium">Capture your findings, lessons, or strategies for the platform.</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Media Header */}
          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Media Header</Label>
            <div 
              className="aspect-video relative rounded-3xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden transition-all group hover:border-primary cursor-pointer"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Upload Featured Image</span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Headlines & Context</Label>
            <div className="space-y-6">
              <div className="space-y-2">
                <Input
                  required
                  placeholder="e.g. The Quantum Nature of Modern Pedagogy"
                  className="h-14 bg-muted/20 border-border rounded-xl text-xl font-bold tracking-tight px-6 focus-visible:ring-primary"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <select
                    className="w-full h-12 bg-muted/20 border border-border rounded-xl px-4 font-bold text-sm focus:ring-1 focus:ring-primary focus:outline-none appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  >
                    <option value="Science">Science Education</option>
                    <option value="German">German Learning</option>
                    <option value="IELTS">IELTS Preparation</option>
                  </select>
                </div>
                <div className="flex items-center justify-between h-12 px-6 bg-muted/20 rounded-xl border border-dashed border-border group hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setFormData({...formData, featured: !formData.featured})}
                >
                  <Label className="text-xs font-bold uppercase tracking-widest cursor-pointer">Featured Story</Label>
                  <div className={`h-5 w-10 rounded-full transition-colors relative ${formData.featured ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                    <div className={`absolute top-1 left-1 h-3 w-3 bg-white rounded-full transition-transform ${formData.featured ? 'translate-x-5' : ''}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Teaser & Synopsis</Label>
            <Textarea
              required
              rows={2}
              placeholder="A brief teaser to catch readers' attention..."
              className="bg-muted/20 border-border rounded-xl px-6 py-4 text-sm font-medium placeholder:italic focus-visible:ring-primary min-h-[80px]"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Main Narrative</Label>
            <div className="bg-muted/20 border-border rounded-[2rem] overflow-hidden min-h-[400px]">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                formats={formats}
                className="h-full font-serif text-lg quill-editor"
                placeholder="Write your story here... Use the toolbar for bold, italic, and more."
              />
            </div>
            <style jsx global>{`
              .quill-editor .ql-toolbar {
                border: none !important;
                background: rgba(0,0,0,0.02);
                padding: 1.5rem !important;
                border-bottom: 1px solid rgba(0,0,0,0.1) !important;
              }
              .quill-editor .ql-container {
                border: none !important;
                font-family: inherit !important;
                font-size: 1.125rem !important;
              }
              .quill-editor .ql-editor {
                padding: 2rem !important;
                min-h-[350px];
              }
              .dark .quill-editor .ql-toolbar {
                background: rgba(255,255,255,0.02);
                border-bottom: 1px solid rgba(255,255,255,0.1) !important;
              }
              .dark .ql-snow .ql-stroke {
                stroke: #fff !important;
              }
              .dark .ql-snow .ql-fill {
                fill: #fff !important;
              }
              .dark .ql-snow .ql-picker {
                color: #fff !important;
              }
            `}</style>
          </div>
          
          <div className="pt-4 flex justify-end">
             <Button type="submit" className="h-14 px-12 rounded-[1.5rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-105 transition-transform">
               Finalize & Publish
             </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
