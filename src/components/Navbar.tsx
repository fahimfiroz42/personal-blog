'use client';

import Link from 'next/link';
import { Search, Rss, Sun, Moon, Menu } from 'lucide-react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import { useState } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="w-full bg-white dark:bg-[#121212] border-b border-border">
      {/* Top Bar: Socials & Theme Toggle */}
      <div className="container mx-auto px-4 h-12 flex items-center justify-between border-b border-border/50 text-muted-foreground">
        <div className="flex items-center gap-4">
          <FacebookIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          <TwitterIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          <InstagramIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          <Rss className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="hover:text-primary transition-colors">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Search className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Main Branding */}
      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        <Link href="/" className="text-6xl font-heading font-bold text-foreground hover:opacity-80 transition-opacity tracking-tight">
          Farsi&apos;s Blogs<span className="text-primary">.</span>
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mt-4">
          Science • German • IELTS
        </p>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 border-t border-border/50">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-4 text-[13px] font-bold uppercase tracking-widest text-foreground/80">
          <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link href="/category/science" className="hover:text-primary transition-colors">Science</Link></li>
          <li><Link href="/category/german" className="hover:text-primary transition-colors">German</Link></li>
          <li><Link href="/category/ielts" className="hover:text-primary transition-colors">IELTS Prep</Link></li>
          <li><Link href="/studio" className="hover:text-primary transition-colors">Manage</Link></li>
        </ul>
      </nav>
    </header>
  );
}
