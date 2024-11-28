import { cn } from "@/utils/className"
import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const buttonBaseVariants = tv(
  {
    base: "a-button flex justify-center items-center rounded-xl",
    variants: {
      size: {
        xl: "h-14 gap-3.5",
        lg: 'h-12',
        md: 'h-8 text-[0.75rem] leading-[0.875rem] px-5 font-semibold'
      },
      color: {
        secondary: "bg-secondary text-white px-5",
        black30: "bg-black/30 text-black",
      },
      isIconOnly: {
        true: "w-auto aspect-square px-0",
        false: ""
      }
    },
    compoundVariants: [
      {
      },
    ],
  },
)

export interface ButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "disabled">,
    VariantProps<typeof buttonBaseVariants> {
  as?: React.ElementType
}

const Button = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, as = "button", children, color, isIconOnly, size, ...props }, ref) => {
    const Component = as
    return (
      <Component
        className={cn(
          buttonBaseVariants({ color, size, isIconOnly }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* LABEL */}
        {children}
      </Component>
    )
  },
)

Button.displayName = "ButtonBase"

export default Button
