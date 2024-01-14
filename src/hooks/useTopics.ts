import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

type TopicType = {
    id: number;
    name: string;
};

export default function useTopics() {
    const [topics, setTopics] = useState<TopicType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function getAllTopics() {
            setIsLoading(true);

            try {
                const { data, error } = await supabase.from("topics").select();
    
                if (!ignore) {
                    setIsLoading(false);

                    if (error) {
                        setErrorMessage(error.message);
                    } else if (data) {
                        setTopics(data);
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
    }, []);

    return {
        topics,
        isLoading,
        errorMessage,
    };
}