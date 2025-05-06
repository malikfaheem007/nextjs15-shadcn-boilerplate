"use client";

import Link from "next/link";
import {useRouter, useSelectedLayoutSegment} from "next/navigation";

import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import Container from "@/components/Container";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
  user: any // TODO
}

export function NavBar({ scroll = false, user }: NavBarProps) {
  const scrolled = useScroll(50);
  const router = useRouter();
  const selectedLayout = useSelectedLayoutSegment();

  const links = marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <Container
        className="flex h-14 items-center justify-between py-4"
      >
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.logo />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>

          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <Link
              href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="hidden md:block"
            >
              <Button
                className="gap-2 px-5"
                size="lg"
              >
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
              <Button
                  className="hidden gap-2 px-5 md:flex"
                  size="lg"
                  onClick={() => router.push("/login")}
              >
                <span>Sign In</span>
                <Icons.arrowRight className="size-4" />
              </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
