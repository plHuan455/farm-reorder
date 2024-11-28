import Flex from "@/components/atoms/Flex";
import IconInfo from "@/components/atoms/icons/info";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/molecules/Popover";
import { useAuth } from "@/libs/auth/Provider";
import { cn } from "@/utils/className";

export default function Banner() {
  const auth = useAuth()
  const level = auth.userInfo?.level ?? 1

  const person = 32

  const items = [
    {
      label: 'Boost Low', content: <Flex className="items-center gap-2">
        <Image src="/images/star.webp" className="w-4" />
        <Typography size={'sm'} className="text-[#FEDB00]">(63)</Typography>
      </Flex>, className: ""
    },
    { label: 'Boost Fast', content: <Image src="/images/energy.webp" className="h-4.5" />, className: 'text-[#FEDB00]' },
    { label: 'Features', content: <IconInfo className="text-[1.125rem] text-white" /> },
  ]
  return (
    <div
      className="container pb-[1.125rem] pt-10"
    >
      <div className="p-0.5 bg-black/30 rounded-lg">
        <Flex className="h-8 justify-between items-center relative"
        >
          <div className="absolute inset-y-0 bg-[#172533] rounded-md left-0 duration-300"
            style={{
              width: `${person}%`
            }}
          >
            <div className="relative w-full" >

            <Popover open>
                <PopoverTrigger asChild>
                  <div className="absolute top-0 w-3 h-3 -right-1 bg-[#FBAC31] -translate-y-full"
                    style={{
                      clipPath: "polygon(50% 100%,0% 26%,100% 26%)"
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="p-0 bg-transparent border-0 w-[max-content] shadow-none" align="center" sideOffset={-4} side="top" >
                  <div className="">
                    <Flex className="bg-[#FBAC31] rounded-full items-center gap-2 py-1 px-3">
                      <div className="shrink-0">
                        <Image src="/images/star.webp" className="w-4" />
                      </div>
                      <Typography className="font-medium" size={'md'}>{person}/100</Typography>
                    </Flex>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* <div className="absolute w-3 h-3 right-0 bg-[#FBAC31] top-0 -translate-y-full"
                style={{
                  clipPath: "polygon(50% 100%,0% 26%,100% 26%)"
                }}
              ></div>
              <div className="absolute -top-2.5  -translate-y-full right-0">
                <Flex className="bg-[#FBAC31] rounded-full items-center gap-2 py-1 px-3">
                  <div className="shrink-0">
                    <Image src="/images/star.webp" className="w-4" />
                  </div>
                  <Typography className="font-medium" size={'md'}>{person}/100</Typography>
                </Flex>
              </div> */}
            </div>
          </div>
          <Typography size={'md'} className="relative font-semibold px-3.5 text-white">level {level}</Typography>
          <Typography size={'md'} className="relative px-3.5 text-white/50">level {level + 1}</Typography>
        </Flex>
      </div>

      <Flex center className="flex-col">
        <Typography size={'titleMd'} className="text-center text-white mt-4.5">
          Boosts for Level
        </Typography>
        <Typography size={'sm'} className="text-white/70 mt-2.5 text-center">
          Level up to increase token farming speed and gets exclusive features
        </Typography>
      </Flex>

      <div className="mt-4 grid grid-cols-3 gap-3 ">
        {items.map((value, index) => <Flex center key={index} className={cn("flex-col bg-black/30 rounded-2xl py-3 text-white", value.className)}>
          <Flex center>{value.content}</Flex>
          <Typography size={'titleSm'} className="mt-2 text-[currentColor]">{value.label}</Typography>
        </Flex>)}
      </div>
    </div>
  )
}
