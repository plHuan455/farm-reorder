"use client"

import { cn } from "@/utils/className"
// import useEmblaCarousel from "embla-carousel-react"
// import ClassNames from "embla-carousel-class-names"
import React from "react"

interface Props {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}
const Carousel = React.forwardRef<HTMLDivElement, Props>(({ children, className, containerClassName }, ref) => {
  return (
    <div className={cn("embla overflow-hidden", className)} ref={ref}>
      <div className={cn("embla__container flex [&>*]:shrink-0 [&>*]:grow-0", containerClassName)}>{children}</div>
    </div>
  )
})

Carousel.displayName = "Carousel"

export default Carousel
