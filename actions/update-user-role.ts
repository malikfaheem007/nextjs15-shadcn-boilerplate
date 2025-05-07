"use server";

import { revalidatePath } from "next/cache";

import { userRoleSchema } from "@/validations/user";
import { getCurrentUser } from "@/app/actions/user";

export type FormData = {
  role: any;
};

export async function updateUserRole(userId: string, data: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user || user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { role } = userRoleSchema.parse(data);

    // Update the user role.
    // TODO: will update the user role in the database

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
