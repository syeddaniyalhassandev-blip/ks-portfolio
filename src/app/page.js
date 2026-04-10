import Footer from "@/components/Footer";
import { SectionMap } from '@/components/SectionMap';
import prisma from '@/lib/prisma';

export default async function Home() {
  let sections = [];
  
  try {
    sections = await prisma.portfolioSection.findMany({
      orderBy: { order: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching portfolio from Prisma", error);
  }

  return (
    <main className="min-h-screen">
      {sections.length > 0 ? sections.map((section) => {
        const BlockComponent = SectionMap[section.type];
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id} data={section.data} id={section.id} />;
      }) : (
        <div className="h-screen flex items-center justify-center text-foreground/50 font-bold uppercase tracking-widest p-4 text-center">
            Portfolio content not found. <br/> Visit /admin to seed your database.
        </div>
      )}
      <Footer />
    </main>
  );
}
