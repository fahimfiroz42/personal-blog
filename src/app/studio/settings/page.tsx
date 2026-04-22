'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, LayoutGrid, Type, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function StudioSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    tag: '',
    title: '',
    buttonText: '',
    link: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Auth check
    const auth = localStorage.getItem('studio_auth');
    if (auth !== 'true') {
      router.push('/studio');
      return;
    }
    setIsAuthenticated(true);

    // Fetch settings
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings/ad`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load settings');
        setIsLoading(false);
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings/ad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Settings updated successfully!');
      }
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated || isLoading) {
    return <div className="py-20 text-center animate-pulse">Loading Archive Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <Link
          href="/studio"
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2 text-muted-foreground hover:text-foreground")}
        >
          <ChevronLeft className="h-4 w-4" />
          Archive Dashboard
        </Link>
        <Button
          onClick={handleSubmit}
          disabled={isSaving}
          className="rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-8 font-bold shadow-xl gap-2 h-10 hover:scale-[1.02] transition-transform"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Saving...' : 'Update Settings'}
        </Button>
      </div>

      <Card className="rounded-[2.5rem] border-border bg-card shadow-2xl overflow-hidden p-8 lg:p-12">
        <CardHeader className="px-0 pt-0 pb-10 space-y-2">
          <CardTitle className="text-4xl font-heading font-bold tracking-tighter italic">Sidebar Global Settings</CardTitle>
          <CardDescription className="text-sm font-medium">Manage your collaboration widget and global promotional elements.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Widget Tag</Label>
                <div className="relative">
                  <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={settings.tag}
                    onChange={(e) => setSettings({ ...settings, tag: e.target.value })}
                    placeholder="e.g. Partner Story"
                    className="pl-10 bg-muted/20 border-border rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Main Heading</Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={settings.title}
                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                    placeholder="e.g. Your Brand could be showcased here."
                    className="pl-10 bg-muted/20 border-border rounded-xl h-12"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Button Text</Label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={settings.buttonText}
                    onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                    placeholder="e.g. Collaborate"
                    className="pl-10 bg-muted/20 border-border rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Target Link (URL)</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={settings.link}
                    onChange={(e) => setSettings({ ...settings, link: e.target.value })}
                    placeholder="https://..."
                    className="pl-10 bg-muted/20 border-border rounded-xl h-12"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-4">
            <Label className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">Background Image URL</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={settings.imageUrl}
                onChange={(e) => setSettings({ ...settings, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="pl-10 bg-muted/20 border-border rounded-xl h-12"
              />
            </div>
            <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-muted">
              <img src={settings.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-60" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
