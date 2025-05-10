"use client";

import clsx from "clsx";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Container from "@/components/shared/Container";

interface DashboardPageWrapperProps {
  type?: "button" | "submit";
  title?: string;
  text?: string;
  buttonText?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  rightComponent?: React.ReactNode;
  className?: string;
  onBack?: boolean;
}

export default function DashboardPageWrapper({
  type = "button",
  title,
  className,
  text,
  buttonText,
  onBack = false,
  onClick,
  children,
  rightComponent,
}: DashboardPageWrapperProps) {
  const router = useRouter();

  return (
    <Container className={clsx("space-y-4 lg:space-y-6 py-4 lg:py-6 xl:py-8", className)}>
      {onBack && (
        <Button type="button" variant="outline" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go Back
        </Button>
      )}
      
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && (
              <h1 className="font-heading text-2xl font-bold">
                {title}
              </h1>
            )}
            {text && (
              <p className="text-base text-muted-foreground">
                {text}
              </p>
            )}
          </div>
          {rightComponent && (
            <div className="shrink-0 pr-4">{rightComponent}</div>
          )}
          {buttonText && (
            <div className="self-end">
              <Button onClick={onClick} type={type}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>{children}</div>
    </Container>
  );
}
