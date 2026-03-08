// We import exam papers as raw text using Vite's ?raw import
import paper1 from './papers/Visual_Art_December-2019.txt?raw';
import paper2 from './papers/Visual_Art_June-2020.txt?raw';
import paper3 from './papers/Visual_Art_June-2021.txt?raw';
import paper4 from './papers/Visual_Art_June-2022.txt?raw';
import paper5 from './papers/Visual_Art_February-2023.txt?raw';
import paper6 from './papers/Visual_Art_December-2023.txt?raw';
import paper7 from './papers/VISUAL_ART_AUGUST-2024.txt?raw';
import paper8 from './papers/VISUAL_ART_JANUARY-2025.txt?raw';
import paper9 from './papers/VISUAL_ART_JUNE-2025.txt?raw';

export interface ExamPaper {
  name: string;
  content: string;
}

export const examPapers: ExamPaper[] = [
  { name: "Visual Art, December 2019", content: paper1 },
  { name: "Visual Art, June 2020", content: paper2 },
  { name: "Visual Art, June 2021", content: paper3 },
  { name: "Visual Art, June 2022", content: paper4 },
  { name: "Visual Art, February 2023", content: paper5 },
  { name: "Visual Art, December 2023", content: paper6 },
  { name: "Visual Art, August 2024", content: paper7 },
  { name: "Visual Art, January 2025", content: paper8 },
  { name: "Visual Art, June 2025", content: paper9 },
];

export function getAllPapersText(): string {
  return examPapers.map(p => `--- ${p.name} ---\n${p.content}`).join('\n\n');
}
