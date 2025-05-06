import Link from "next/link";

import { cn, nFormatter } from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import Container from "@/components/Container";
import {siteConfig} from "@/config/site";

export default async function HeroLanding() {

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <Container className="flex flex-col items-center gap-5 text-center max-w-5xl">
        <Link
          href="https://twitter.com/miickasmt/status/1810465801649938857"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span>
          <span className="hidden md:flex">Introducing&nbsp;</span> Next Auth
          Roles Template on <Icons.twitter className="ml-2 size-3.5" />
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Kick off with a bang with{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            SaaS Starter
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Build your next project using Next.js 14, Prisma, Neon, Auth.js v5,
          Resend, React Email, Shadcn/ui, Stripe.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
            <Button asChild size="lg">
              <Link
                href="/pricing"
                prefetch={true}
                className={cn(
                  "gap-2"
                )}
              >
                <span>Go Pricing</span>
                <Icons.arrowRight className="size-4" />
              </Link>
            </Button>

          <Button asChild variant="outline" size="lg">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "px-5"
              )}
            >
              <Icons.gitHub className="mr-2 size-4" />
              <p>
                <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
                <span className="font-semibold">{nFormatter(5000)}</span>
              </p>
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
