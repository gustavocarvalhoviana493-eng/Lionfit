import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Você pratica treinos atualmente?",
    options: ["Sim, regularmente", "Sim, mas raramente", "Não, sou sedentário(a)"]
  },
  {
    id: 2,
    text: "Qual é o seu objetivo principal?",
    options: ["Ganhar Massa Muscular", "Emagrecer e Secar", "Definição Atlética"]
  },
  {
    id: 3,
    text: "Quantos dias por semana você quer treinar?",
    options: ["1 a 2 dias", "3 a 4 dias", "5 a 6 dias"]
  },
  {
    id: 4,
    text: "Onde você prefere treinar?",
    options: ["Em Casa", "Na Academia", "Ao Ar Livre"]
  },
  {
    id: 5,
    text: "Qual nível você se considera?",
    options: ["Iniciante", "Intermediário", "Avançado"]
  }
];

export const DISCOUNT_PERCENTAGE = 55;