import { getSubscriptionPlan } from "@/lib/subscription";
import { ComparePlans } from "@/components/pricing/compare-plans";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { Metadata } from "next";
import { APP_NAME } from "@/constants";

export const metadata: Metadata = {
  title: `Pricing | ${APP_NAME}`,
  description: "Compare plans and find the right option for your needs",
};

export default async function PricingPage() {
  const subscriptionPlan = await getSubscriptionPlan();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards subscriptionPlan={subscriptionPlan} />
      <hr className="container" />
      <ComparePlans />
      <PricingFaq />
    </div>
  );
}
