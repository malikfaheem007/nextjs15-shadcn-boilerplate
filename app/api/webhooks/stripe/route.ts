import { headers } from "next/headers";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import {updateOrganization} from "@/actions/organizations";
import {StripeSubscription} from "@/types/common";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if(!signature) {
    throw new Error("Invalid signature");
  }

  let event: Stripe.Event;

  event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
  );

  // try {
  //
  // } catch (error) {
  //   return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  // }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.

    const subscriptionData: StripeSubscription = {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: 0, // TODO -- will fix this with real value
    };

    await updateOrganization(session?.metadata?.organizationId!, subscriptionData)
  }

  if (event.type === "invoice.payment_succeeded") {
    const session = event.data.object as Stripe.Invoice;

    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
    if (session.billing_reason != "subscription_create") {
      // Retrieve the subscription details from Stripe.
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      await updateOrganization(session?.metadata?.organizationId!, {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: 0,
      })
    }
  }

  return new Response(null, { status: 200 });
}
