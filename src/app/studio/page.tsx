'use client';

import React, { useState, useEffect } from 'react';
import { usePosts } from '@/context/PostContext';
import { Plus, Trash2, Edit, ExternalLink, LayoutDashboard, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../lib/utils';

export default function StudioDashboard() {
  const { posts, deletePost, isLoading } = usePosts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('studio_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('studio_auth', 'true');
    } else {
      alert('Incorrect Secret Key');
    }
  };

  if (isLoading || isAuthLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-heading italic text-2xl">Loading Studio...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="mb-12 flex flex-col items-center">
            <div className="h-20 w-20 bg-zinc-900 dark:bg-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-100 dark:text-zinc-900 mb-6 shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
              <LayoutDashboard className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-heading font-black italic tracking-tighter text-foreground">Archive Access</h1>
            <p className="text-muted-foreground text-[10px] uppercase font-black tracking-[0.4em] mt-4">Authorized Personnel Only</p>
          </div>

          <Card className="border-border shadow-2xl p-10 rounded-[3rem] bg-card/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] ml-1">Archive Secret Key</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 border-border bg-background rounded-2xl text-center text-xl tracking-[0.5em] focus-visible:ring-primary shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-zinc-500/20"
              >
                Unlock Archive
              </Button>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
              ← Return to Public Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-heading flex items-center gap-3 tracking-tighter">
            Studio<span className="text-primary italic">.</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Manage your educational platform and track content performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive h-12"
            onClick={() => {
              localStorage.removeItem('studio_auth');
              window.location.reload();
            }}
          >
            Logout
          </Button>
          <Link
            href="/studio/settings"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-xl h-12 px-6 font-bold border-border hover:bg-muted")}
          >
            Settings
          </Link>
          <Link
            href="/studio/new"
            className={cn(buttonVariants({ variant: "default" }), "rounded-xl h-12 px-6 font-bold shadow-lg gap-2")}
          >
            <Plus className="h-5 w-5" />
            Create New Story
          </Link>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-border bg-card shadow-sm group hover:border-primary transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Total Stories</CardDescription>
            <CardTitle className="text-4xl font-heading font-black">{posts.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Disciplines</CardDescription>
            <CardTitle className="text-4xl font-heading font-black">3</CardTitle>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl border-border bg-card shadow-sm bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">Sync Status</CardDescription>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-black uppercase tracking-tighter">Server Persistent</span>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Posts Table */}
      <Card className="rounded-2xl border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search stories..." className="pl-9 h-9 bg-background border-border text-xs rounded-lg" />
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-9 rounded-lg font-bold text-xs uppercase tracking-widest">
            <Filter className="h-3 w-3" />
            Filters
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-foreground text-sm line-clamp-1">{post.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 font-medium">{post.date}</div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant="secondary" className="px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-muted border-border">
                      {post.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    {post.featured ? (
                      <Badge className="bg-primary/20 text-primary border-none text-[9px] font-bold uppercase tracking-widest">Featured</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest opacity-40">Standard</Badge>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/studio/edit/${post.id}`}
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 rounded-lg hover:text-primary")}
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/post/${post.id}`}
                        target="_blank"
                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 rounded-lg hover:text-primary")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:text-destructive" onClick={() => deletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center space-y-4">
                    <div className="text-xl font-heading font-bold text-muted-foreground/50 italic">The Archive is Empty.</div>
                    <Link
                      href="/studio/new"
                      className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
                    >
                      Begin Writing
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
