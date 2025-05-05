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

export async function setCurrentOrgId(orgId: string) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('No user found');

    const { error } = await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
            ...user.user_metadata,
            current_org_id: orgId,
        },
    });

    if (error) throw error;

    return { success: true };
}

export async function getCurrentOrgId() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.user_metadata?.current_org_id ?? null;
}
