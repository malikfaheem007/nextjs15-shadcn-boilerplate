import { redirect } from "next/navigation";

import { sidebarLinks } from "@/config/dashboard";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { getCurrentUser } from "@/actions/user";
import { getUserOrganizations } from "@/actions/organizations";
import Container from "@/components/shared/Container";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const current_org_id = user?.user_metadata?.current_org_id ?? null;

  if (!current_org_id) redirect("/select-organization");

  const organizations = await getUserOrganizations();

  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) => !authorizeOnly || authorizeOnly === user.role
    ),
  }));

  return (
    <div className="relative flex min-h-screen w-full">
      {/* Sidebar */}
      <DashboardSidebar
        currentOrgId={current_org_id}
        organizations={organizations}
        links={filteredLinks}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background border-b border-border">
          <Container className="flex items-center p-4 lg:p-6 xl:p-8 justify-between h-14 lg:h-[60px] space-x-4">

            <MobileSheetSidebar
              currentOrgId={current_org_id}
              organizations={organizations}
              links={filteredLinks}
            />
            <div className="flex-1">
              <SearchCommand links={filteredLinks} />
            </div>
            <div className="flex items-center gap-x-4">
              <ModeToggle />
              <UserAccountNav />
            </div>
          </Container>
        </header>

         {/*Page Content*/}
        <main className="flex-1 w-full">
            {children}
        </main>
      </div>
    </div>
  );
}
