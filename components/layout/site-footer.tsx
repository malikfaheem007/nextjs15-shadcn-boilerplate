import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";

import { NewsletterForm } from "../forms/newsletter-form";
import { Icons } from "../shared/icons";
import {footerLinks, siteConfig} from "@/config/site";
import Container from "@/components/shared/Container";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <Container className="container grid grid-cols-2 gap-6 py-14 md:grid-cols-5">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-foreground">
              {section.title}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-full flex flex-col items-end sm:col-span-1 md:col-span-2">
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t py-4">
        <Container className="flex items-center justify-between">
           <span className="text-muted-foreground text-sm">
            Copyright &copy; 2024. All rights reserved.
          </span>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              <Icons.gitHub className="size-5" />
            </Link>
            <ModeToggle />
          </div>
        </Container>
      </div>
    </footer>
  );
}
