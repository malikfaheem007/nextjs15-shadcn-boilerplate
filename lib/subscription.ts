import { pricingData } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";
import {getCurrentOrganization, getCurrentOrgId} from "@/actions/organizations";
import {UserSubscriptionPlan} from "@/types";

export async function getSubscriptionPlan(): Promise<UserSubscriptionPlan> {
  const org_id = await getCurrentOrgId()
  const organization = await getCurrentOrganization(org_id);

  const {stripePriceId, stripeSubscriptionId} = organization.stripe_subscription  || {};

  // Check if user is on a paid plan.
  const isPaid = !!stripePriceId;

  // Find the pricing data corresponding to the user's plan
  const userPlan = pricingData.find(
      (plan) => plan.stripeIds.monthly === stripePriceId || plan.stripeIds.yearly === stripePriceId
  );

  const plan = isPaid && userPlan ? userPlan : pricingData[0]

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === stripePriceId
      ? "year"
      : null
    : null;

  let isCanceled = false;
  if (isPaid && stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    ...organization.stripe_subscription,
    isPaid,
    interval,
    isCanceled
  }
}
