import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import DashboardPageWrapper from "@/components/shared/DashboardPageWrapper";

export default function DashboardBillingLoading() {
  return (
    <DashboardPageWrapper
      title="Billing"
      text="Manage billing and your subscription plan."
    >
      <div className="grid gap-8">
        <Skeleton className="h-28 w-full rounded-lg md:h-24" />
        <CardSkeleton />
      </div>
    </DashboardPageWrapper>
  );
}
