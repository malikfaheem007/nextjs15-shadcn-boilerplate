import { getSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { BillingInfo } from "@/components/pricing/billing-info";
import DashboardPageWrapper from "@/components/shared/DashboardPageWrapper";

export const metadata = constructMetadata({
  title: "Billing – SaaS Starter",
  description: "Manage billing and your subscription plan.",
});

export default async function BillingPage() {
  const userSubscriptionPlan = await getSubscriptionPlan();

  return (
    <DashboardPageWrapper
      title="Billing"
      text="Manage billing and your subscription plan."
    >
        <BillingInfo userSubscriptionPlan={userSubscriptionPlan} />
    </DashboardPageWrapper>
  );
}
