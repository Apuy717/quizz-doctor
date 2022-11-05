export interface iQuestion {
  question: string;
  listAnswer: iListQuestion[];
  answer: string | null;
}

export interface iListQuestion {
  key: string;
  value: string;
}
