import React from "react";
import { Loader2 } from "lucide-react";
import {cn} from "@/lib/utils";

export const CircularLoader = (className?: string) => {
  return <Loader2 className={cn("h-16 w-16 animate-spin", className)} />;
};
