import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import {getCurrentOrgId, getUserOrganizations} from "@/app/actions/organizations";
import {redirect} from "next/navigation";
import {OrganizationSwitcher} from "@/app/(protected)/dashboard/OrgSwitcher";

export default async function DashboardPage() {

  const orgId = await getCurrentOrgId();
  if (!orgId) redirect('/select-organization');
  const organizations = await getUserOrganizations();

  return (
    <DashboardPageWrapper
      title="Dashboard"
      text="This is Dashboard page"
    >
      <div>Dashboard for org {orgId}</div>

      <OrganizationSwitcher organizations={organizations} currentOrgId={orgId} />
    </DashboardPageWrapper>
  );
}
