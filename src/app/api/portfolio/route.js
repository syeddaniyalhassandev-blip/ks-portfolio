import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading portfolio.json", error);
    return NextResponse.json({ error: "Failed to load portfolio data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // 1. Check auth
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    
    if (!token || token.value !== 'authenticated') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Read new data
    const newData = await request.json();

    // 3. Save to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing portfolio.json", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
