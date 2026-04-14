export default function CommentsSection() {
  return (
    <div className="mt-20 space-y-12">
      <div className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          0 Comments
        </h3>
        
        {/* Comment Entry */}
        <div className="flex gap-6 pb-8 border-b border-border/50">
          <div className="h-12 w-12 rounded-full bg-muted shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?u=user1" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">Joanna Doe</span>
              <span className="text-[10px] uppercase font-bold text-muted-foreground italic underline">July 26, 2026</span>
            </div>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              This was a very informative article! I really appreciate the depth of research in the Science section.
            </p>
            <button className="text-[10px] font-black uppercase text-primary border border-primary/20 px-3 py-1 hover:bg-primary hover:text-white transition-all">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      <div className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Leave a Reply
        </h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Name *" 
              className="w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:italic"
            />
            <input 
              type="email" 
              placeholder="Email *" 
              className="w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:italic"
            />
          </div>
          <textarea 
            rows={6} 
            placeholder="Your message *" 
            className="w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:italic"
          />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="save-info" className="accent-primary" />
            <label htmlFor="save-info" className="text-xs text-muted-foreground italic">
              Save my name and email in this browser for the next time I comment.
            </label>
          </div>
          <button className="bg-primary text-white px-10 py-4 font-bold uppercase tracking-[.2em] text-[11px] hover:scale-105 transition-transform">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
