import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const buttonVariants = cva(
  "btn relative inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        outline: "btn-outline",
        ghost: "btn-ghost",
        link: "btn-link link link-hover",
      },
      size: {
        default: "",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "h-9 w-9",
      },
      btnColor: {
        default: "btn-neutral",
        primary: "btn-primary",
        secondary: "btn-secondary",
        accent: "btn-accent",
        danger: "btn-error",
        success: "btn-success",
        warning: "btn-warning",
        info: "btn-info",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      btnColor: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, btnColor, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, btnColor, className }),
          " cursor-pointer [&>*]:pointer-events-auto"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
