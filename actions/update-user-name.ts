"use server";

import { userNameSchema } from "@/validations/user";
import { revalidatePath } from "next/cache";
import {getCurrentUser} from "@/actions/user";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user || user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    // TODO: will update the user name in the database

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
