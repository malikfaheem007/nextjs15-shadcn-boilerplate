"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";
import { userAuthSchema } from "@/validations/auth";
import { InputWithLabel } from "../shared/InputWithLabel";
import { LoadingButton } from "../shared/LoadingButton";
import { loginAction } from "@/actions/login-action";
import { registerAction } from "@/actions/register-action";
import TextSeparator from "../shared/TextSeparator";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "register" | "login";
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({
  className,
  type = "login",
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      if (type === "register") {
        await registerAction(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        );
        console.log("Registered user:", {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        toast.success("Account created! Please check your email to verify.");
        router.push("/login");
        return;
      } else {
        await loginAction(data.email, data.password);
        router.push("/select-organization");
      }
    } catch (error: any) {
      console.error(`${type} error:`, error);
      toast.error(`${type === "register" ? "Registration" : "Login"} failed`, {
        description: error?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
    console.log("Login succeeded for", data.email, data.password);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {type === "register" && (
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputWithLabel
                label="First Name"
                id="firstName"
                placeholder="John"
                disabled={isLoading || isGoogleLoading}
                aria-invalid={!!errors?.firstName}
                aria-describedby="firstName-error"
                {...register("firstName", {
                  required: "First name is required",
                })}
                hasError={!!errors?.firstName}
                helperText={errors?.firstName?.message || ""}
              />
            </div>

            <div className="w-1/2">
              <InputWithLabel
                label="Last Name"
                id="lastName"
                placeholder="Doe"
                disabled={isLoading || isGoogleLoading}
                aria-invalid={!!errors?.lastName}
                aria-describedby="lastName-error"
                {...register("lastName", { required: "Last name is required" })}
                hasError={!!errors?.lastName}
                helperText={errors?.lastName?.message || ""}
              />
            </div>
          </div>
        )}

        <InputWithLabel
          label="Email"
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading || isGoogleLoading}
          aria-invalid={!!errors?.email}
          aria-describedby="email-error"
          {...register("email")}
          hasError={!!errors?.email}
          helperText={errors?.email?.message || ""}
        />

        <InputWithLabel
          label="Password"
          id="password"
          type="password"
          placeholder="********"
          disabled={isLoading || isGoogleLoading}
          aria-invalid={!!errors?.password}
          aria-describedby="password-error"
          {...register("password")}
          hasError={!!errors?.password}
          helperText={errors?.password?.message || ""}
        />

        <LoadingButton loading={isLoading}>
          {type === "register" ? "Sign Up with Email" : "Sign In with Email"}
        </LoadingButton>
      </form>

      <TextSeparator>Or continue with</TextSeparator>

      <Button
        type="button"
        variant="outline"
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}
        Google
      </Button>
    </div>
  );
}
