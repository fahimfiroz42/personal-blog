import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';

export default function AuthorBox({ author }: { author: string }) {
  return (
    <div className="maktub-card p-10 mt-16 bg-white dark:bg-[#1e1e1e] flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-full overflow-hidden mb-6 border-4 border-primary/10 p-1">
        <img src={`https://i.pravatar.cc/200?u=${author}`} alt={author} className="h-full w-full rounded-full object-cover" />
      </div>
      <h3 className="text-2xl font-heading font-bold mb-1">{author}</h3>
      <p className="text-[10px] uppercase font-black tracking-[.2em] text-primary mb-4">Founder & Editor</p>
      <div className="max-w-md text-sm text-muted-foreground leading-relaxed mb-6 italic">
        Hello! I'm {author}, a passionate educator and writer dedicated to sharing high-quality resources for students and language learners worldwide.
      </div>
      <div className="flex items-center gap-4 text-muted-foreground border-t border-border/50 pt-6 w-full justify-center">
        <TwitterIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
        <FacebookIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
        <InstagramIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
      </div>
      <button className="mt-8 bg-slate-900 text-white dark:bg-slate-700 px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">
        View All Posts
      </button>
    </div>
  );
}
