import { cn } from "@/utils/className"
import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const flexVariants = tv({
  base: "flex",
  variants: {
    center: {
      true: "justify-center items-center",
    },
  },
  defaultVariants: {},
})

interface Props extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexVariants> {
  as?: React.ElementType
}

const Flex: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, as: Comp = "div", center, children, ...rest } = props || {}
  return (
    <Comp className={cn(flexVariants({ center }), className)} {...rest} ref={ref}>
      {children}
    </Comp>
  )
})

Flex.displayName = "Flex"

export default Flex
