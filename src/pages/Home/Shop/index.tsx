import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { generateShopUrl } from "@/pages/Shop/common";
import { NavLink } from "react-router-dom";

export default function Shop() {
  return (
    <NavLink to={generateShopUrl()}>
      <Flex className="flex-col items-center w-12"> 
      <Flex center className="bg-white rounded-lg aspect-square w-[80%]">
        <Image src="/images/shop.webp" className="w-[80%] aspect-[35/31]" alt="shop" />
      </Flex>
      <Flex center className="relative -mt-1 bg-[#EF0739] rounded-xl text-white px-3 py-0.5">
        <Typography size={'sm'} className="text-center font-semibold">Buy</Typography>
      </Flex>
    </Flex>
    </NavLink>
  )
}
