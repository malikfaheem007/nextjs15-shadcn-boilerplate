'use server'

import {createClient} from "@/utils/supabase/server";

export async function getUserOrganizations() {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_organizations');

    if(error) throw new Error(error.message)

    return data ?? [];
}

export async function createOrganization(name: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('create_organization', {
        name,
        metadata: {},
        logo_url: null,
    });

    if(error) throw new Error(error.message)


    return data;
}
