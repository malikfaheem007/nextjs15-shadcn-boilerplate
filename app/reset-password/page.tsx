"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputWithLabel } from "@/components/shared/InputWithLabel";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    // Add your password reset logic here
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-none shadow-md">
        <CardHeader className="relative h-10 flex items-center justify-center">
          <Link
            href="/login"
            className="absolute left-6 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <CardTitle className="text-center w-full">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputWithLabel
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button className="w-full" onClick={handleReset}>
            Reset password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
