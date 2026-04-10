import Footer from "@/components/Footer";
import { SectionMap } from '@/components/SectionMap';
import { kv } from '@vercel/kv';

export default async function Home() {
  let portfolioData = { sections: [] };
  
  try {
    const data = await kv.get('portfolio_data');
    if (data) portfolioData = data;
  } catch (error) {
    console.error("Error fetching portfolio from KV", error);
  }

  return (
    <main className="min-h-screen">
      {portfolioData.sections.length > 0 ? portfolioData.sections.map((section) => {
        const BlockComponent = SectionMap[section.type];
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id} data={section.data} id={section.id} />;
      }) : (
        <div className="h-screen flex items-center justify-center text-foreground/50 font-bold uppercase tracking-widest">
            Portfolio content not found. Set up via Admin Panel.
        </div>
      )}
      <Footer />
    </main>
  );
}
