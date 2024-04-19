
import { supabase } from "./supabaseClient";

export type TopicType = {
    id: number;
    name: string;
};

export type QuestionType = {
    id: number;
    question: string;
    translation: string;
    answer: string;
    hint: string;
};

export type Profile = {
    id: number;
    name: string;
};

export type Word = {
    word: string,
    meaning: string,
    example: string,
    translation: string;
};

export type WordList = {
    total: number | null;
    words: Word[];
};

type PaginationRange = {
    from: number;
    to: number;
};

export async function getTopics(level: string) {
    const { data, error } = await supabase.from("topics").select().eq("level", level.toUpperCase());

    if (error) {
        throw new Error(error.message);
    }

    return data as TopicType[];
}

export async function getRandomQuestions(topicId: number) {
    const { data, error } = await supabase.rpc("get_random_questions", { topicid: topicId, });

    if (error) {
        throw new Error(error.message);
    }

    return data as QuestionType[];
}

export async function getProfile() {
    const { data } = await supabase.from("profiles").select("id, name").single();

    return data as Profile;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
  
    if(error) {
        throw error;
    }
}

export async function getWords(includeTotalCount?: boolean, pagination?: PaginationRange) : Promise<WordList> {
    let query = supabase.from("words").select("*", {
        count: includeTotalCount? "exact" : undefined
    });

    if (pagination) {
        query = query.range(pagination.from, pagination.to);
    }

    const { data, error, count } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return {
        words: data as Word[],
        total: count,
    };
}

export async function addWord({word, translation, example, meaning} : Word) {
    const { error } = await supabase
        .from("words")
        .insert({ word, translation, example, meaning });
    
    return error;
}

export async function updateWord({word, translation, example, meaning} : Word) {
    const { error } = await supabase
        .from("words")
        .update({translation, example, meaning})
        .eq("word", word);
    
    return error;
}

export async function deleteWord(word: string) {
    const { error } = await supabase
        .from("words")
        .delete()
        .eq("word", word);
    
    return error;
}
