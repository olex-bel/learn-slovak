import { getWords } from "../../services/api";
import type { Word } from "../../services/api";

export type LearnCard = {
    word: string;
    info: string;
};
  
export type TestCard = {
    question: string;
    answer: string;
};

export async function getLearnCards(): Promise<LearnCard[]> {
    const words = await getWords();

    return words.map((item: Word) => {
        return [{
            word: item.word,
            info: item.meaning,
        }, {
            word: item.word,
            info: item.translation,
        }, {
            word: item.word,
            info: item.example,
        }];
    }).flat();
}

export async function getTestCards():  Promise<TestCard[]> {
    const words = await getWords();

    return words.map((item: Word) => {
        return [{
            question: item.word,
            answer: item.translation,
        }, {
            question: item.translation,
            answer: item.word,
        }, {
            question: item.meaning,
            answer: item.word,
        }];
    }).flat().sort(() => Math.random() - 0.5);
}