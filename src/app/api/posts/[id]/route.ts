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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const posts = await getPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const posts = await getPosts();
    
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const updatedPost = { ...posts[index], ...body, id }; // Ensure ID remains same
    posts[index] = updatedPost;
    
    await savePosts(posts);
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const posts = await getPosts();
    const updatedPosts = posts.filter((p) => p.id !== id);
    await savePosts(updatedPosts);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
