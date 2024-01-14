
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function useAuth() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let ignore = false;

        async function getSession() {
            try {
                setIsLoading(true);
                const { data: { session }} = await supabase.auth.getSession();

                if (!ignore) {
                    setSession(session);
                    setIsLoading(false);
                }
            } catch(e) {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        const { data: {subscription} } = supabase.auth.onAuthStateChange((_, session) => {
            setSession(session);
        });

        getSession();

        return () => {
            ignore = true;

            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return {session, isLoading};
}
