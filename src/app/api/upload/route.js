import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    // 1. Check Auth
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Upload to Vercel Blob
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
    const blob = await put(filename, file, {
      access: 'public',
    });

    // 4. Return URL
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Error uploading file to Vercel Blob", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
