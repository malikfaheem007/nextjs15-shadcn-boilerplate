// app/api/set-current-org/route.ts
import { NextResponse } from 'next/server';
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    const { orgId } = await req.json();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
            ...user.user_metadata,
            current_org_id: orgId,
        }
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}
