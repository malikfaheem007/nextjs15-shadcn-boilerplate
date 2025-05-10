import DashboardPageWrapper from "@/components/shared/DashboardPageWrapper";
import { APP_NAME } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${APP_NAME}`,
  description: "View your personalized dashboard and insights",
};

export default async function DashboardPage() {
  return (
    <DashboardPageWrapper title="Dashboard" text="This is Dashboard page">
      <h1>This is dashboard page.</h1>
    </DashboardPageWrapper>
  );
}
