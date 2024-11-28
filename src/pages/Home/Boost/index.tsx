import Flex from "@/components/atoms/Flex";
import Typography from "@/components/atoms/Typography";
import { generateProfileUrl } from "@/pages/Profile/common";
import { NavLink } from "react-router-dom";

export default function Boots() {
  return (
    <NavLink to={generateProfileUrl()}>
      <Flex className="items-center gap-1 bg-[#172533] rounded-lg curosr-pointer pl-1 pr-3 py-1">
      <img className="aspect-square w-8" src="/images/rocket.webp"/>
      <Typography size={'md'} className="text-white font-bold">Boot</Typography>
    </Flex>
    </NavLink>
  )
}
