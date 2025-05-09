import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCurrentUser } from "@/actions/user";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile user={user} />
      <NavBar user={user} scroll={true} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
