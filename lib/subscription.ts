import { pricingData } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";
import {getCurrentOrganization, getCurrentOrgId} from "@/app/actions/organizations";
import {UserSubscriptionPlan} from "@/types";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if(!userId) throw new Error("Missing parameters");

  const org_id = await getCurrentOrgId()
  const organization = await getCurrentOrganization(org_id);

  // if (!organization.stripeSubscription) {
  //   throw new Error("Stripe: Something went wrong");
  // }

  const {stripePriceId, stripeCurrentPeriodEnd, stripeSubscriptionId} = organization.stripeSubscription  || {};

  const stripeCurrentPeriodEndDate = new Date(stripeCurrentPeriodEnd);

  // Check if user is on a paid plan.
  const isPaid =
    !!(stripePriceId &&
        stripeCurrentPeriodEndDate?.getTime() + 86_400_000 > Date.now());

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    pricingData.find((plan) => plan.stripeIds.monthly === stripePriceId) ||
    pricingData.find((plan) => plan.stripeIds.yearly === stripePriceId);

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
    ...organization.stripeSubscription,
    stripeCurrentPeriodEnd: stripeCurrentPeriodEndDate?.getTime(),
    isPaid,
    interval,
    isCanceled
  }
}
