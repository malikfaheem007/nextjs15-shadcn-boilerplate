import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});
