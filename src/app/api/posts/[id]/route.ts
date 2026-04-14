import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blog';

const DATA_PATH = path.join(process.cwd(), 'data', 'posts.json');

async function getPosts(): Promise<BlogPost[]> {
  const data = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(data);
}

async function savePosts(posts: BlogPost[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await getPosts();
    const updatedPosts = posts.filter((p) => p.id !== params.id);
    await savePosts(updatedPosts);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
