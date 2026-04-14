import Link from 'next/link';
import { BookOpen, GraduationCap, Languages, TrendingUp } from 'lucide-react';

export default function Sidebar() {
  const categories = [
    { name: 'Science Education', icon: GraduationCap, color: 'text-blue-500', href: '/category/science' },
    { name: 'German Learning', icon: Languages, color: 'text-orange-500', href: '/category/german' },
    { name: 'IELTS Prep', icon: BookOpen, color: 'text-green-500', href: '/category/ielts' },
  ];

  return (
    <aside className="sticky top-24 h-fit space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-all"
            >
              <cat.icon className={`h-4 w-4 ${cat.color}`} />
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20">
        <TrendingUp className="mb-3 h-6 w-6 text-primary" />
        <h3 className="mb-2 text-lg font-bold">IELTS Boost</h3>
        <p className="text-sm text-muted-foreground">
          Get the latest speaking & writing tips delivered weekly.
        </p>
        <button className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
