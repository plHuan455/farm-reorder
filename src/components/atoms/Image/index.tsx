import { cn } from "@/utils/className";
import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>{
}
export default function Image({className, ...args}: Props) {
  return (
    <img loading="lazy" {...args} className={cn("object-cover border-0 outline-0", className)}/>
  )
}
