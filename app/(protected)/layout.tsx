import { redirect } from "next/navigation";

import { sidebarLinks } from "@/config/dashboard";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
    DashboardSidebar,
    MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import {getCurrentUser} from "@/actions/user";
import {getUserOrganizations} from "@/actions/organizations";
import Container from "@/components/shared/Container";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
    const user = await getCurrentUser();

    if (!user) redirect("/login");

    const current_org_id = user?.user_metadata?.current_org_id ?? null;

    if (!current_org_id) redirect('/select-organization');

    const organizations = await getUserOrganizations();

    const filteredLinks = sidebarLinks.map((section) => ({
        ...section,
        items: section.items.filter(
            ({ authorizeOnly }) => !authorizeOnly || authorizeOnly === user.role,
        ),
    }));

    return (
        <div className="relative flex min-h-screen w-full">
            <DashboardSidebar currentOrgId={current_org_id} organizations={organizations} links={filteredLinks} />

            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
                    <Container className="flex max-w-7xl items-center gap-x-3 px-0">
                        <MobileSheetSidebar currentOrgId={current_org_id} organizations={organizations} links={filteredLinks} />

                        <div className="w-full flex-1">
                            <SearchCommand links={filteredLinks} />
                        </div>

                        <ModeToggle />
                        <UserAccountNav />
                    </Container>
                </header>

                <main className="flex-1 p-4 xl:px-8">
                    <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
                        {children}
                    </MaxWidthWrapper>
                </main>
            </div>
        </div>
    );
}
