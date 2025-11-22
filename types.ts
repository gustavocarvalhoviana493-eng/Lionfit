export enum AppScreen {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  ROULETTE = 'ROULETTE',
  OFFER = 'OFFER'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
}