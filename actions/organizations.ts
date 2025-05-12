'use server'

import {createClient} from "@/utils/supabase/server";
import {Organization} from "@/types/common";

export async function getUserOrganizations() {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_organizations');

    if(error) throw error;

    return data ?? [];
}

export async function getCurrentOrganization(id: string): Promise<Organization> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_organization_by_id', {
        org_id: id,
    });

    if(error) throw error;

    return data
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

export async function updateOrganization(id: string, newData: any) {
    const supabase = await createClient();

    const {error} = await supabase.from("organizations").update(newData).eq(id, id);

    if(error) throw error;
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
