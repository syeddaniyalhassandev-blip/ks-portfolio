import Footer from "@/components/Footer";
import fs from 'fs';
import path from 'path';
import { SectionMap } from '@/components/SectionMap';

export default async function Home() {
  const dataFile = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const fileContents = fs.readFileSync(dataFile, 'utf8');
  const portfolioData = JSON.parse(fileContents);

  return (
    <main className="min-h-screen">
      {portfolioData.sections.map((section) => {
        const BlockComponent = SectionMap[section.type];
        if (!BlockComponent) return null;
        return <BlockComponent key={section.id} data={section.data} id={section.id} />;
      })}
      <Footer />
    </main>
  );
}
