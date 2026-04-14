import { posts } from '@/data/posts';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import PostFilters from '@/components/PostFilters';

export default function Home() {
  const featuredPost = posts.find((p) => p.featured) || posts[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-12">
        {/* Featured Post */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured Story</h2>
          </div>
          <BlogCard post={featuredPost} isFeatured />
        </section>

        {/* Dynamic Filtering Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Latest from the Lab & Classroom</h2>
          </div>
          <PostFilters />
        </section>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <Sidebar />
      </div>
    </div>
  );
}
