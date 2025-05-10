import { redirect } from "next/navigation";

import { DeleteAccountSection } from "@/components/dashboard/delete-account";
import { UserNameForm } from "@/components/forms/user-name-form";
import { UserRoleForm } from "@/components/forms/user-role-form";
import { getCurrentUser } from "@/actions/user";
import { APP_NAME } from "@/constants";
import { Metadata } from "next";
import DashboardPageWrapper from "@/components/shared/DashboardPageWrapper";

export const metadata: Metadata = {
  title: `Settings | ${APP_NAME}`,
  description: "Manage your preferences and account settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <DashboardPageWrapper
      title="Settings"
      text="Manage account and website settings."
    >
      <div className="divide-y divide-muted pb-10">
        <UserNameForm
          user={{ id: user.id, name: user.user_metadata.firstName || "" }}
        />
        <UserRoleForm user={{ id: user.id, role: user.role }} />
        <DeleteAccountSection />
      </div>
    </DashboardPageWrapper>
  );
}
