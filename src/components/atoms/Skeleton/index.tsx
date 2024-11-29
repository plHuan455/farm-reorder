import { cn } from "@/utils/className"
import { CSSProperties } from "react"
import { type VariantProps, tv } from "tailwind-variants"

const skeletonVariants = tv({
  base: "block skeleton-item rounded-lg bg-[#f8fafc] animate-pulse" ,
  variants: {
    shape: {
      rect: "rect-no-css",
      square: "aspect-square",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
})

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  children?: React.ReactNode
  className?: string
  shape?: "square" | "rect" | "circle"
  style?: CSSProperties
}

export default function Skeleton({ shape, className, children, ...props }: SkeletonProps) {
  return (
    <span className={cn(skeletonVariants({ shape }), className)} {...props}>
      {children}
    </span>
  )
}
