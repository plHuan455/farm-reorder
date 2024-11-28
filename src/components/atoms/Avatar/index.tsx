import { cn } from "@/utils/className"
import Image from "../Image"

interface Props {
src: string
className?: string
}

export default function Avatar({src, className}: Props) {
  return (
    <div className={cn("relative aspect-square", className)}
      // style={{
      //   backgroundImage: 'url("/images/avatar.png")',
      //   backgroundSize: 'contain'
      // }}
    >

      <Image className="absolute left-0 top-0 w-full h-full rounded-full border-[3px] border-[#5DC2FB]" src={src} />
    </div>
  )
}
