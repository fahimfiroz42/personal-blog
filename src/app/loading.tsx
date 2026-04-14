import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Brand Pulse */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
          <h2 className="text-4xl font-heading font-bold text-foreground relative italic tracking-tighter">
            Farsi&apos;s Blogs<span className="text-primary tracking-normal">.</span>
          </h2>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5 h-1">
            <div className="w-8 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full -translate-x-full animate-[loading_1.5s_infinite_ease-out]"></div>
            </div>
            <div className="w-8 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full -translate-x-full animate-[loading_1.5s_infinite_ease-out_0.2s]"></div>
            </div>
            <div className="w-8 bg-primary/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full -translate-x-full animate-[loading_1.5s_infinite_ease-out_0.4s]"></div>
            </div>
          </div>
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground/60">
            Collecting Stories
          </p>
        </div>
      </div>
    </div>
  );
}
