import { iListQuestion, iQuestion } from "../dao/question.interface";

export interface iQuestionComponent {
  page: number;
  question: iQuestion[];
  onAnswer: (i: iListQuestion) => void;
  children: any;
}
