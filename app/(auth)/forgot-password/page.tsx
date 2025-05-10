"use client";

import { sendResetPasswordEmail } from "@/actions/send-reset-email";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      await sendResetPasswordEmail(formData);
      toast.success("Password reset email sent. Check your inbox.");
      setEmail("");
    } catch {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 size-4" />
          Back
        </>
      </Link>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <Icons.logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Icons.spinner className="mr-2 size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Email"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
