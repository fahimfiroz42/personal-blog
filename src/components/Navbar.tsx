'use client';

import Link from 'next/link';
import { Search, Menu, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
            EDUBlog
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/category/science" className="hover:text-primary transition-colors">Science</Link>
            <Link href="/category/german" className="hover:text-primary transition-colors">German</Link>
            <Link href="/category/ielts" className="hover:text-primary transition-colors">IELTS</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search posts..."
              className="h-9 w-64 rounded-full bg-secondary pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-muted transition-colors"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
