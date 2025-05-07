'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {createClient} from "@/utils/supabase/client";

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error.message);
                setSession(null);
            } else {
                setSession(data.session);
            }
            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return { session, loading };
}
