import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    let data = await kv.get('portfolio_data');
    
    // Automatic Seeding: If KV is empty, try to seed from local file
    if (!data) {
        try {
            const dataFile = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
            if (fs.existsSync(dataFile)) {
                const fileContents = fs.readFileSync(dataFile, 'utf8');
                data = JSON.parse(fileContents);
                if (data) {
                    await kv.set('portfolio_data', data);
                    console.log("KV Seeded from local portfolio.json");
                }
            }
        } catch (seedError) {
            console.error("Failed to seed KV", seedError);
        }
    }

    if (!data) {
        return NextResponse.json({ sections: [] });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading portfolio from KV", error);
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

    // 3. Save to KV
    await kv.set('portfolio_data', newData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing portfolio to KV", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
