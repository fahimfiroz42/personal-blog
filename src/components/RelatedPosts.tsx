import { BlogPost } from '@/types/blog';
import Link from 'next/link';
import { usePosts } from '@/context/PostContext';

export default function RelatedPosts({ currentCategoryId }: { currentCategoryId: string }) {
  const { posts } = usePosts();
  const related = posts.slice(0, 4); // For demo, just slice first 4

  return (
    <div className="mt-16 space-y-8">
      <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
        Related Articles
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {related.map((post) => (
          <div key={post.id} className="group cursor-pointer space-y-3">
            <div className="aspect-square bg-muted overflow-hidden">
              <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-[13px] font-bold font-heading line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </h4>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">{post.date}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 space-y-8 pt-10 border-t border-border/50">
        <h3 className="text-sm font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
          Other Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="maktub-card p-6 flex items-center gap-6 bg-white dark:bg-[#1e1e1e]">
            <div className="h-16 w-16 bg-muted shrink-0"></div>
            <div>
              <p className="text-[9px] uppercase font-black text-muted-foreground mb-1">Previous Story</p>
              <h4 className="text-[14px] font-bold font-heading leading-tight italic">These Are The 10 Best Restaurants...</h4>
            </div>
          </div>
          <div className="maktub-card p-6 flex items-center gap-6 bg-white dark:bg-[#1e1e1e] text-right">
            <div className="flex-1">
              <p className="text-[9px] uppercase font-black text-muted-foreground mb-1">Next Story</p>
              <h4 className="text-[14px] font-bold font-heading leading-tight italic">Far far away, behind the word...</h4>
            </div>
            <div className="h-16 w-16 bg-muted shrink-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
