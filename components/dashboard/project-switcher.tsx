"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {Organization} from "@/types/common";
import {LoadingButton} from "@/components/shared/LoadingButton";
import {useRouter} from "next/navigation";

export default function ProjectSwitcher(
    {
  large = false,
  organizations,
  currentOrgId,
}: {
  large?: boolean;
  organizations: Organization[];
  currentOrgId: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSwitchOrg(orgId: string) {
        setLoading(true);
        await fetch(`/api/organizations/${orgId}/set-current-org`, {
            method: 'POST',
            body: JSON.stringify({ orgId }),
        });
        router.refresh(); // reload the page/server components
    }

  const [openPopover, setOpenPopover] = useState(false);

  const selectedOrg = organizations?.find(org => org.id === currentOrgId);

  if (!organizations || !selectedOrg) {
    return <ProjectSwitcherPlaceholder />;
  }

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <LoadingButton
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
            loading={loading}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                    "bg-blue-500",
                )}
              />
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                    large ? "w-full" : "max-w-[80px]",
                  )}
                >
                  {selectedOrg.name}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </LoadingButton>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selectedOrg!}
            organizations={organizations}
            setOpenPopover={setOpenPopover}
            handleSwitchOrg={handleSwitchOrg}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProjectList({
  selected,
  organizations,
  setOpenPopover,
    handleSwitchOrg,
}: {
  selected: Organization;
  organizations: Organization[];
  setOpenPopover: (open: boolean) => void;
  handleSwitchOrg: (orgId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {organizations.map(({ id, name }) => (
        <Button
          key={id}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
          )}
          onClick={() => {
            setOpenPopover(false)
            handleSwitchOrg(id);
          }}
        >
          <div className={cn("size-3 shrink-0 rounded-full", "bg-blue-500")} />
          <span
            className={`flex-1 truncate text-sm ${
              selected.id === id
                ? "font-medium text-foreground"
                : "font-normal"
            }`}
          >
            {name}
          </span>
          {selected.id === id && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
              <Check size={18} aria-hidden="true" />
            </span>
          )}
        </Button>
      ))}
      <Button
        variant="outline"
        className="relative flex h-9 items-center justify-center gap-2 p-2"
        onClick={() => {
          setOpenPopover(false);
        }}
      >
        <Plus size={18} className="absolute left-2.5 top-2" />
        <span className="flex-1 truncate text-center">New Organization</span>
      </Button>
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
