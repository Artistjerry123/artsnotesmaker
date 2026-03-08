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
import paper_va1 from './papers/VA_1_Paper3_Essay.txt?raw';
import paper_va2 from './papers/VA_2_Paper2_MCQ.txt?raw';
import paper_va4 from './papers/VA_4_Paper2_MCQ.txt?raw';
import paper_va5 from './papers/VA_5_Paper3_MCQ.txt?raw';
import paper_va6 from './papers/VA_6_Paper2_MCQ.txt?raw';
import paper_va7 from './papers/VA_7_Paper2_MCQ.txt?raw';
import paper_va9 from './papers/VA_9_Paper2_MCQ.txt?raw';
import paper_va10 from './papers/VA_10_Paper3_Essay.txt?raw';
import paper_va13 from './papers/VA_13_Paper3_Essay.txt?raw';
import paper_va14 from './papers/VA_14_Paper2_MCQ.txt?raw';
import paper_va15 from './papers/VA_15_Paper3_MCQ.txt?raw';
import paper_va17 from './papers/VA_17_Paper2_MCQ.txt?raw';
import paper_va18 from './papers/VA_18_Paper3_MCQ.txt?raw';
import paper_va20 from './papers/VA_20_Paper3_MCQ.txt?raw';
import paper_va21 from './papers/VA_21_Paper3_Essay.txt?raw';
import paper_va22 from './papers/VA_22_Paper2_MCQ.txt?raw';

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
  { name: "VA Paper-III Essay (D-79-10)", content: paper_va1 },
  { name: "VA Paper-II MCQ (D-79-10)", content: paper_va2 },
  { name: "VA Paper-II MCQ (D-79-11)", content: paper_va4 },
  { name: "VA Paper-III MCQ (D-79-12)", content: paper_va5 },
  { name: "VA Paper-II MCQ (D-79-12)", content: paper_va6 },
  { name: "VA Paper-II MCQ (D-79-13)", content: paper_va7 },
  { name: "VA Paper-II MCQ (D-7909)", content: paper_va9 },
  { name: "VA Paper-III Essay (D-7909)", content: paper_va10 },
  { name: "VA Paper-III Essay (J-79-13)", content: paper_va13 },
  { name: "VA Paper-II MCQ (J-79-13 v14)", content: paper_va14 },
  { name: "VA Paper-III MCQ (J-79-12)", content: paper_va15 },
  { name: "VA Paper-II MCQ (J-79-13 v17)", content: paper_va17 },
  { name: "VA Paper-III MCQ (J-79-13)", content: paper_va18 },
  { name: "VA Paper-III MCQ (J-79-10)", content: paper_va20 },
  { name: "VA Paper-III Essay (J-7910)", content: paper_va21 },
  { name: "VA Paper-II MCQ (J-7910)", content: paper_va22 },
];

export function getAllPapersText(): string {
  return examPapers.map(p => `--- ${p.name} ---\n${p.content}`).join('\n\n');
}
