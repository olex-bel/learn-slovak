
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

export async function getWords() {
    const { data, error } = await supabase.from("words").select();

    if (error) {
        throw new Error(error.message);
    }

    return data as Word[];
}


