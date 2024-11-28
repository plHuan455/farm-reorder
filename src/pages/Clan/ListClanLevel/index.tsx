import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import Carousel from "@/components/organisms/Carousel";
import { ILevel } from "@/services/clan/types";
import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react";

interface Props {
  levels: ILevel[]
  className?: string
  onColorChange?: (color: string) => void
}
export default function ListClanLevel({levels, className, onColorChange}: Props) {
  const [ref, carouselApi] = useEmblaCarousel()
  useEffect(() => {
    carouselApi?.on('slidesInView', (data) => {
      levels[data.selectedScrollSnap()] && onColorChange?.(levels[data.selectedScrollSnap()].color)
    })
    carouselApi?.on("select", (data) => {
      levels[data.selectedScrollSnap()] && onColorChange?.(levels[data.selectedScrollSnap()].color)
    })
  }, [carouselApi, levels])
  return (
    <div className={className}>
      <div className="container">
        <Carousel ref={ref} className="overflow-visible">
          {levels.map((value, index) => <div key={index} className="shrink-0 ml-4 first:ml-0">
            <div className="w-[80vw] rounded-2xl overflow-hidden"
            style={{
              backgroundColor: value.color
            }}
            >
              <Flex className="items-center">
                <div className="shrink w-[36%] h-full">
                  <Image src={value.avatar} alt={value.name} className="aspect-[102/149] w-full"/>
                </div>
                <div className="grow min-w-0">
                  <Flex center className="flex-col ">
                    <Typography size={'titleLg'}>
                      {value.name}
                    </Typography>
                    <Typography className="mt-1 text-[#172533] text-[1rem]" size={'md'}>
                      200 clans
                    </Typography>
                    <div className="text-[#172533CC] mt-3 flex flex-col gap-2">
                      <Typography size={'sm'} className="">
                        Owner: {value.bonus_ton}% IAP
                      </Typography>
                      <Typography size={'sm'} className="">
                        Members: +{value.bonus_farming}% farming
                      </Typography>
                      <Typography size={'sm'} className="">
                        Limit members: {value.total_member}
                      </Typography>
                    </div>
                  </Flex>

                </div>
              </Flex>
            </div>
          </div>)}
        </Carousel>
      </div>
    </div>
  )
}
