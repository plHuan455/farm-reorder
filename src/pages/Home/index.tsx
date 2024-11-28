import Info from "./Info";
import Typography from "@/components/atoms/Typography";
import Flex from "@/components/atoms/Flex";
import Resources from "./Resources";
import Energy from "./Energy";
import Boots from "./Boost";
import Shop from "./Shop";
import Calendar from "./Calendar";
import Clan from "./Clan";
import Wheel from "./Wheel";
import { cn } from "@/utils/className";
import { useAuth } from "@/libs/auth/Provider";
import { formatToken } from "@/utils/number";
import Image from "@/components/atoms/Image";
import ENVS from "@/constants/envs";

export default function Home() {
  const {userInfo} = useAuth()
  return <>
    <div className={cn("w-screen h-screen")}
    >
      <div className="relative w-full h-full">
        <Flex className="top-[2%] inset-x-[2%] absolute justify-between">
          <div className="max-w-[45%]">
            <Info />
          </div>
          <div>
            <Resources />
          </div>
        </Flex>

        <Flex className="absolute top-[12%] left-[2%] flex-col gap-3">
          <Shop />
          <Clan />
        </Flex>
        <Flex className="absolute top-[12%] right-[2%] flex-col gap-5">
          <Calendar />
          <Wheel />
        </Flex>
        <Flex className="flex-col items-center absolute top-[14%] left-1/2 -translate-x-1/2 ">
          <div className="w-[3.25rem] relative aspect-square">
            <Image src="/assets/token.webp" alt='token' className="w-full" />
          </div>
          <Flex center className="text-[#183959] gap-1">
            <Typography size={'2xl'} font={'bigNumber'} className="font-bold">
              {formatToken(userInfo?.coin)}
            </Typography>
            <Typography size={'md'} className="font-semibold">{ENVS.TOKEN}</Typography> 
          </Flex>
        </Flex>
        <Flex className="absolute left-[2%] top-[85%]">
          <Energy />
        </Flex>
        <Flex className="absolute right-[2%] top-[83%]">
          <Boots />
        </Flex>
      </div>
    </div>
  </>
}
