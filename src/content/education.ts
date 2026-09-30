export interface Degree {
  institution: string;
  degree: string;
  year: string;
  location: string;
}

export interface Language {
  language: string;
  level: string;
}

export const education: Degree[] = [
  {
    institution: 'ISIG Kairouan',
    degree: 'MSc Business Intelligence',
    year: '2013',
    location: 'Kairouan, Tunisia',
  },
  {
    institution: 'ISSAT Sousse',
    degree: 'MSc Applied Computer Science',
    year: '2007',
    location: 'Sousse, Tunisia',
  },
];

export const languages: Language[] = [
  { language: 'Arabic', level: 'Native' },
  { language: 'French', level: 'C1' },
  { language: 'English', level: 'B2+' },
  { language: 'German', level: 'A2 → B1' },
];
