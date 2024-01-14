import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { QuestionType } from "../features/quiz/Questions";

export default function useQuestions(topicId: number) {
    const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function getAllTopics() {
            setIsLoading(true);

            try {
                const { data, error } = await supabase.rpc("get_random_questions", { topic_id: topicId, });
    
                if (!ignore) {
                    setIsLoading(false);

                    if (error) {
                        setErrorMessage(error.message);
                    } else if (data) {
                        setQuestions(data);
                    }
                }
            } catch(e) {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        getAllTopics();

        return () => {
            ignore = true;
        };
    }, [topicId]);

    return {
        questions,
        isLoading,
        errorMessage,
    };
}
