import Stripe from "stripe"

import { env } from "@/env.mjs"

console.log(env.STRIPE_API_KEY, "hello hello");

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
})
