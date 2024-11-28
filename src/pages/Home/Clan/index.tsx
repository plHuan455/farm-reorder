import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { generateClanUrl } from "@/pages/Clan/common";
import { useNavigate } from "react-router-dom";

export default function Clan() {
  const navigate = useNavigate()
  return (
    <Flex className="flex-col items-center w-12"
      onClick={() => {
        navigate(generateClanUrl())
      }}
    >
      <Image className="w-[83%] aspect-square" src="/images/clan.webp" alt='clan' />
      <Flex center className="relative -mt-1 rounded-xl text-white  w-full py-0.5 bg-[#FEDB00]">
        <Typography size={'sm'} className="text-center font-semibold text-black">Clan</Typography>
      </Flex>
    </Flex>
  )
}
