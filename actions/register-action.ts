"use server";

import { createClient } from "@/utils/supabase/server";

export async function registerAction(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
