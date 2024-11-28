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
    },
    defaultVariants: {
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
  ({ as = "p", font, children, className, ...props }, ref) => {
    const Component = as
    return (
      <Component className={cn(typographyVariants({ font }), className)} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

Typography.displayName = "Typography"

export default Typography
