"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendResetPasswordEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) throw error;
  return { success: true };
}
