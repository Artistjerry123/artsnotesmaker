// We import exam papers as raw text using Vite's ?raw import
import paper_jul16 from './papers/Visual_Art_July-2016.txt?raw';
import paper_jan17 from './papers/Visual_Art_January-2017.txt?raw';
import paper_nov17 from './papers/Visual_Art_November-2017.txt?raw';
import paper_jul18 from './papers/Visual_Art_July-2018.txt?raw';
import paper_jun19 from './papers/Visual_Art_June-2019.txt?raw';
import paper_dec19 from './papers/Visual_Art_December-2019.txt?raw';
import paper_jun20 from './papers/Visual_Art_June-2020.txt?raw';
import paper_jun21 from './papers/Visual_Art_June-2021.txt?raw';
import paper_jun22 from './papers/Visual_Art_June-2022.txt?raw';
import paper_feb23 from './papers/Visual_Art_February-2023.txt?raw';
import paper_dec23 from './papers/Visual_Art_December-2023.txt?raw';
import paper_aug24 from './papers/VISUAL_ART_AUGUST-2024.txt?raw';
import paper_jan25 from './papers/VISUAL_ART_JANUARY-2025.txt?raw';
import paper_jun25 from './papers/VISUAL_ART_JUNE-2025.txt?raw';

export interface ExamPaper {
  name: string;
  content: string;
}

export const examPapers: ExamPaper[] = [
  { name: "Visual Art, July 2016", content: paper_jul16 },
  { name: "Visual Art, January 2017", content: paper_jan17 },
  { name: "Visual Art, November 2017", content: paper_nov17 },
  { name: "Visual Art, July 2018", content: paper_jul18 },
  { name: "Visual Art, June 2019", content: paper_jun19 },
  { name: "Visual Art, December 2019", content: paper_dec19 },
  { name: "Visual Art, June 2020", content: paper_jun20 },
  { name: "Visual Art, June 2021", content: paper_jun21 },
  { name: "Visual Art, June 2022", content: paper_jun22 },
  { name: "Visual Art, February 2023", content: paper_feb23 },
  { name: "Visual Art, December 2023", content: paper_dec23 },
  { name: "Visual Art, August 2024", content: paper_aug24 },
  { name: "Visual Art, January 2025", content: paper_jan25 },
  { name: "Visual Art, June 2025", content: paper_jun25 },
];

export function getAllPapersText(): string {
  return examPapers.map(p => `--- ${p.name} ---\n${p.content}`).join('\n\n');
}
