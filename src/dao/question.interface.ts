export interface iQuestion {
  question: string;
  listAnswer: iListQuestion[];
  answer: string | null;
}

interface iListQuestion {
  key: string;
  value: string;
}
