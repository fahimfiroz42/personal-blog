import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-16 w-full", className)}>
      <div className="relative flex items-center justify-center">
        {/* Animated Background Ring */}
        <div className="absolute h-10 w-10 rounded-full border-2 border-primary/10 animate-pulse"></div>
        {/* The Spinner */}
        <Loader2 className="h-6 w-6 text-primary animate-[spin_1s_linear_infinite]" />
      </div>
      <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground/50 animate-pulse">
        Fetching Archive
      </p>
    </div>
  );
}
