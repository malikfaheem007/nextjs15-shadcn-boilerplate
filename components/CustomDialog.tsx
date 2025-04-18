import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LoadingButton } from "./LoadingButton";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  isLoading?: boolean;
  secondaryBtnText?: string;
  primaryBtnText?: string;
  formId?: string;
  children: React.ReactNode;
  className?: string;
}

export function CustomDialog({
  children,
  title,
  description,
  open,
  onOpenChange,
  formId,
  secondaryBtnText = "Cancel",
  primaryBtnText = "Save",
  isLoading,
  className,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("flex max-h-[80vh] p-0 flex-col", className)}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          <DialogFooter className="border-t px-6 py-4">
            <Button
              type="button"
              onClick={() => onOpenChange?.(false)}
              variant="outline"
            >
              {secondaryBtnText}
            </Button>
            <LoadingButton
              type="submit"
              form={formId}
              disabled={isLoading}
              loading={isLoading}
            >
              {primaryBtnText}
            </LoadingButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
