// hooks/useAccounts.ts
import { useEffect, useState } from 'react';
import {createClient} from "@/utils/supabase/client";

export function useAccounts() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
         async function getAccounts() {
             try {
                 const {data, error} = await supabase.rpc('get_accounts');

                 if (error) {
                     throw new Error(error.message)
                 }
                 setAccounts(data ?? []);

             }catch (error){
                 console.error('Error loading accounts:', error)
             } finally {
                 setLoading(false)
             }
        }

        getAccounts();

    }, []);

    return { accounts, loading };
}
