"use client";

import { useTransition } from "react";
import { generateUserStripe } from "@/actions/generate-user-stripe";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

import {LoadingButton} from "@/components/shared/LoadingButton";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
}

export function BillingFormButton({
  year,
  offer,
  subscriptionPlan,
}: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"]
  );

  const stripeSessionAction = () =>
    startTransition(async () => await generateUserStripeSession());

  const userOffer =
    subscriptionPlan.stripePriceId ===
    offer.stripeIds[year ? "yearly" : "monthly"];

  return (
    <LoadingButton
      variant={userOffer ? "default" : "outline"}
      className="w-full"
      disabled={isPending}
      loading={isPending}
      onClick={stripeSessionAction}
    >
      {userOffer ? "Manage Subscription" : "Upgrade"}
    </LoadingButton>
  );
}
