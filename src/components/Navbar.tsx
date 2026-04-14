'use client';

import Link from 'next/link';
import { Search, Sun, Moon, Rss } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'top-4 w-[95%] lg:w-[1100px] border border-border shadow-2xl rounded-2xl bg-background/90 backdrop-blur-xl px-6 py-2' 
          : 'top-0 w-full border-b border-border bg-background'
      }`}
    >
      {/* Top Bar (Hidden on Scroll) */}
      <div 
        className={`overflow-hidden transition-all duration-500 ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100 border-b border-border/40'
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-4">
            <FacebookIcon className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
            <TwitterIcon className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
            <InstagramIcon className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
            <Rss className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-8 w-8 text-muted-foreground hover:text-foreground">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Search className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* Main Bar (Morphs on Scroll) */}
      <div 
        className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-12' : 'flex-col py-8'
        }`}
      >
        {/* Branding */}
        <div className={`transition-all duration-500 ${isScrolled ? 'scale-75' : 'flex flex-col items-center'}`}>
          <Link 
            href="/" 
            className={`font-heading font-bold text-foreground hover:opacity-80 transition-opacity tracking-tighter ${
              isScrolled ? 'text-2xl' : 'text-5xl'
            }`}
          >
            Farsi&apos;s Blogs<span className="text-primary tracking-normal">.</span>
          </Link>
          
          {!isScrolled && (
            <div className="flex items-center gap-3 mt-4 animate-in fade-in duration-700">
              <Separator className="w-8 bg-border" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground/60">
                Digital Archive
              </p>
              <Separator className="w-8 bg-border" />
            </div>
          )}
        </div>

        {/* Navigation Content (Row on scroll, list below on flat) */}
        {!isScrolled ? (
          <nav className="w-full mt-6 border-t border-border/40 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center justify-center gap-x-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li className="h-3 w-px bg-border"></li>
              <li><Link href="/category/science" className="hover:text-foreground transition-colors">Science</Link></li>
              <li><Link href="/category/german" className="hover:text-foreground transition-colors">German</Link></li>
              <li><Link href="/category/ielts" className="hover:text-foreground transition-colors">IELTS Prep</Link></li>
              <li className="h-3 w-px bg-border"></li>
              <li><Link href="/studio" className="hover:text-foreground transition-colors">Studio</Link></li>
            </ul>
          </nav>
        ) : (
          /* Scrolled Row Navigation */
          <div className="flex items-center gap-8 animate-in slide-in-from-right-4 duration-500">
            <nav>
              <ul className="flex items-center gap-x-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <li><Link href="/category/science" className="hover:text-primary transition-colors">Science</Link></li>
                <li><Link href="/category/german" className="hover:text-primary transition-colors">German</Link></li>
                <li><Link href="/category/ielts" className="hover:text-primary transition-colors">IELTS</Link></li>
                <li><Link href="/studio" className="hover:text-primary transition-colors font-black">Studio</Link></li>
              </ul>
            </nav>
            <div className="flex items-center gap-2 border-l border-border pl-6">
               <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Search className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
