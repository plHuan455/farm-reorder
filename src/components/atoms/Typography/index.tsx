import { cn } from "@/utils/className"
import React, { CSSProperties } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const typographyVariants = tv(
  {
    base: "typography leading-[100%]",
    variants: {
      font: {
        content: 'font-content',
        bigNumber: 'font-bigNumber font-bold'
      },
      size: {
        "2xl": "text-[2.5rem] leading-[3rem]",
        titleXl: "text-[1.5rem] leading-[1.75rem] font-bold", // 24
        titleLg: "text-[1.125rem] leading-[1.5rem] font-bold", // 24
        titleMd: "text-[1rem] leading-[1.25rem] font-bold",  // 16
        titleSm: "text-[0.75rem] leading-[1rem] font-semibold",
        lg: "text-[1.125rem] leading-[1.5rem]",  // 18
        md: 'text-[14px] leading-[16px]',
        sm: 'text-[0.75rem] leading-[0.875rem]'  // 12
      },
    },
    defaultVariants: {
      size: 'md',
      font: "content",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl"],
  },
)

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  style?: CSSProperties
  rel?: string
  target?: string
  onClick?: (e: React.MouseEvent) => void
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = "p", font, size, children, className, ...props }, ref) => {
    const Component = as
    return (
      <Component className={cn(typographyVariants({ size, font }), className)} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

Typography.displayName = "Typography"

export default Typography
