"use client";

import { useTransition } from "react";
import { openCustomerPortal } from "@/actions/open-customer-portal";

import {LoadingButton} from "@/components/shared/LoadingButton";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = openCustomerPortal.bind(null, userStripeId);

  const stripeSessionAction = () =>
    startTransition(async () => await generateUserStripeSession());

  return (
    <LoadingButton loading={isPending} disabled={isPending} onClick={stripeSessionAction}>
      Open Customer Portal
    </LoadingButton>
  );
}
