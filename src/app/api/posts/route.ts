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

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const posts = await getPosts();
    
    const newPost: BlogPost = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
    };

    const updatedPosts = [newPost, ...posts];
    await savePosts(updatedPosts);
    
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
