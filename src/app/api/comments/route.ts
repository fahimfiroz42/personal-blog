import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'comments.json');

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  date: string;
}

async function getComments(): Promise<Comment[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveComments(comments: Comment[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(comments, null, 2), 'utf8');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  const comments = await getComments();
  const filtered = comments.filter((c) => c.postId === postId);
  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, author, email, content } = body;

    if (!postId || !author || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comments = await getComments();
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author,
      email,
      content,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
    };

    comments.unshift(newComment); // Add to top
    await saveComments(comments);

    return NextResponse.json(newComment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}
