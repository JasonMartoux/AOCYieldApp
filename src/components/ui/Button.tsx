import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          
          // Variants
          variant === "primary" &&
            "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/25",
          variant === "secondary" &&
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
          variant === "outline" &&
            "border-2 border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
          variant === "ghost" &&
            "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
          
          // Sizes
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-base",
          size === "lg" && "px-6 py-3 text-lg",
          
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
