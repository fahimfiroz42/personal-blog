'use client';

import Link from 'next/link';
import { Search, Sun, Moon, Rss, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FacebookIcon, GithubIcon, LinkedInIcon, WhatsappIcon, InstagramIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out w-full",
        isScrolled
          ? 'top-4 w-[95%] lg:w-[1100px] border border-white/20 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-3xl bg-background/70 backdrop-blur-2xl px-6 md:px-8 py-3'
          : 'top-0 border-b border-border/50 bg-background/50 backdrop-blur-md'
      )}
    >
      {/* Top Bar (Hidden on Scroll and Mobile) */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 hidden md:block",
          isScrolled ? 'h-0 opacity-0' : 'h-12 opacity-100 border-b border-border/20'
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/fahim.firozfarsi" target="_blank" rel="noopener noreferrer"><FacebookIcon className="h-3.5 w-3.5 hover:text-primary cursor-pointer transition-all hover:scale-110" /></a>
              <a href="https://github.com/fahimfiroz42" target="_blank" rel="noopener noreferrer"><GithubIcon className="h-3.5 w-3.5 hover:text-primary cursor-pointer transition-all hover:scale-110" /></a>
              <a href="https://www.linkedin.com/in/fahim-firoz-farsi/" target="_blank" rel="noopener noreferrer"><LinkedInIcon className="h-3.5 w-3.5 hover:text-primary cursor-pointer transition-all hover:scale-110" /></a>
              <a href="https://wa.me/8801720885856" target="_blank" rel="noopener noreferrer"><WhatsappIcon className="h-3.5 w-3.5 hover:text-primary cursor-pointer transition-all hover:scale-110" /></a>
            </div>
            <span className="h-3 w-px bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span>Available for freelance</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/rss" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Rss className="h-3 w-3" />
              <span>RSS Feed</span>
            </Link>
            <div className="h-3 w-px bg-border/50" />
            <button onClick={toggleDarkMode} className="flex items-center gap-2 hover:text-primary transition-colors uppercase">
              {mounted && (isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />)}
              <span>{mounted ? (isDarkMode ? 'Light' : 'Dark') : 'Theme'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar (Morphs on Scroll) */}
      <div
        className={cn(
          "flex items-center justify-between transition-all duration-700 px-6",
          isScrolled ? 'h-12' : 'flex-col py-6 md:py-10'
        )}
      >
        {/* Branding */}
        <div className={cn(
          "transition-all duration-700 w-full md:w-auto flex items-center justify-between md:justify-center",
          isScrolled ? 'scale-90 origin-left' : 'flex-col items-center'
        )}>
          <Link
            href="/"
            className={cn(
              "font-heading font-black text-foreground hover:opacity-80 transition-all tracking-tighter",
              isScrolled ? 'text-xl md:text-2xl' : 'text-3xl md:text-7xl'
            )}
          >
            FARSI&apos;S BLOGS<span className="text-primary italic">.</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 hover:text-primary transition-colors">
              {mounted && (isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {!isScrolled && (
            <div className="hidden md:flex items-center gap-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-1000">
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="text-[11px] uppercase tracking-[0.6em] font-black text-muted-foreground/40">
                The Digital Archive
              </p>
              <div className="h-px w-10 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isScrolled ? (
          <nav className="hidden md:block w-full mt-10 border-t border-border/20">
            <ul className="flex items-center justify-center gap-x-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/80">
              <li><Link href="/" className="hover:text-primary transition-all hover:tracking-[0.4em]">Home</Link></li>
            </ul>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-10 animate-in slide-in-from-right-8 duration-700">
            <nav>
              <ul className="flex items-center gap-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              </ul>
            </nav>
            <div className="flex items-center gap-4 border-l border-border/30 pl-8">
              <Link href="/" className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-primary/20">
                <Search className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-border shadow-2xl animate-in slide-in-from-top-4 duration-500 overflow-hidden">
          <nav className="flex flex-col p-8 space-y-6">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-heading font-black italic text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stay Connected</p>
              <div className="flex items-center gap-4">
                <a href="#"><FacebookIcon className="h-4 w-4" /></a>
                <a href="#"><InstagramIcon className="h-4 w-4" /></a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
