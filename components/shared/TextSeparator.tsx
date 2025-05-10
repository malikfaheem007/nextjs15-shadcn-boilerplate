import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

function TextSeparator({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {children}
        </span>
      </div>
    </div>
    // <div className={cn("flex items-center gap-2 py-[0.51px]", className)}>
    //   <Separator className="flex-1" />
    //   <span className="text-muted-foreground">{children}</span>
    //   <Separator className="flex-1" />
    // </div>
  );
}

export default TextSeparator;
