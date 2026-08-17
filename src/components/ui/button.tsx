import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hv-blue-electric focus-visible:ring-offset-2 focus-visible:ring-offset-hv-bg-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-hv-blue text-hv-white hover:bg-hv-blue-electric hover:shadow-[0_0_80px_rgba(40,88,216,0.25)]",
        secondary:
          "border border-white/20 bg-transparent text-hv-white hover:bg-white/5",
        outline:
          "border border-white/20 bg-transparent text-hv-white hover:bg-white/5",
        ghost: "bg-transparent text-hv-white hover:bg-white/10",
        link: "text-hv-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
