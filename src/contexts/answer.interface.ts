export interface iAnsCtx {
  keyQuestion: string;
  valueQuestion: string;
  keyAnswer: string;
  valueAnswer: string;
  statusAnswer: boolean | null;
}

export interface iAnswerContext {
  email: string;
  setEmail: (email: string) => void;
  answer: iAnsCtx[];
  setAnswer: (answer: iAnsCtx[]) => void;
  setGift: (gift: string) => void;
  gift: string;
}
