"use server";

import { createClient } from "@/utils/supabase/server";

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return { success: true };
}
