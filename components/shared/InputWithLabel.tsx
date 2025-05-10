"use client";
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  showPasswordToggle?: boolean;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      helperText,
      label,
      type = "text",
      hasError,
      showPasswordToggle,
      className,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const isPasswordField = type === "password" && showPasswordToggle;

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={props.id} className="mb-2.5 inline-block font-medium">
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            type={isPasswordField ? (show ? "text" : "password") : type}
            className={cn(className, isPasswordField && "pr-10")}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
              tabIndex={-1}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              "mt-2 text-xs",
              hasError ? "text-red-600" : "text-gray-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
