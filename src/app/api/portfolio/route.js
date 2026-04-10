import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Try to fetch from Prisma (Ordered by 'order' field)
    let sections = await prisma.portfolioSection.findMany({
      orderBy: { order: 'asc' }
    });

    // 2. Migration/Seeding Logic: If Prisma is empty, try to seed from KV or Local File
    if (sections.length === 0) {
        let initialData = null;

        // Try KV first
        try {
            initialData = await kv.get('portfolio_data');
        } catch (kvErr) {
            console.error("KV fetch failed during migration", kvErr);
        }

        // Try Local File second
        if (!initialData) {
            try {
                const dataFile = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
                if (fs.existsSync(dataFile)) {
                    const fileContents = fs.readFileSync(dataFile, 'utf8');
                    initialData = JSON.parse(fileContents);
                }
            } catch (fileErr) {
                console.error("Local file fetch failed during migration", fileErr);
            }
        }

        // Seed Prisma if data was found
        if (initialData && initialData.sections) {
            const seedPromises = initialData.sections.map((section, index) => 
                prisma.portfolioSection.create({
                    data: {
                        id: section.id || `section_${index}`,
                        type: section.type,
                        navTitle: section.navTitle,
                        data: section.data,
                        order: index
                    }
                })
            );
            await Promise.all(seedPromises);
            
            // Re-fetch now that it's seeded
            sections = await prisma.portfolioSection.findMany({
                orderBy: { order: 'asc' }
            });
            console.log("Prisma DB seeded successfully");
        }
    }

    return NextResponse.json({ sections });
  } catch (error) {
    console.error("Error fetching portfolio from Prisma", error);
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

    // 2. Read new data (Expects { sections: [...] })
    const body = await request.json();
    const newSections = body.sections || [];

    // 3. Update Database 
    // Optimization: We remove the explicit transaction here because some cloud DBs 
    // (like db.prisma.io) have trouble starting transactions within time limits on low tiers.
    // For a single-user portfolio, sequential operations are safe and faster.
    
    await prisma.portfolioSection.deleteMany(); // Clear old
    
    if (newSections.length > 0) {
        await prisma.portfolioSection.createMany({
            data: newSections.map((section, index) => ({
                id: section.id,
                type: section.type,
                navTitle: section.navTitle,
                data: JSON.parse(JSON.stringify(section.data)), // Ensure it's a clean JSON object
                order: index
            }))
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CRITICAL ERROR: Failed to write portfolio to Prisma", error);
    return NextResponse.json({ error: "Failed to save data", details: error.message }, { status: 500 });
  }
}
