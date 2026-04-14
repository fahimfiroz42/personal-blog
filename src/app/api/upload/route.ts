import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      url: `/uploads/${filename}`,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
