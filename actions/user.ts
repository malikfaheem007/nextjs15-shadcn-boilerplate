import {createClient} from "@/utils/supabase/server";

export async function getCurrentUser() {
    const supabase = await createClient()

    const {data} = await supabase.auth.getUser();

    return data.user;
}
