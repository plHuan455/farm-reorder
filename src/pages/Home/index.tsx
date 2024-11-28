import Button from "@/components/atoms/Button";
import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/utils/className";
import { NavLink } from "react-router-dom";
import { generateClaimUrl } from "../Claim/common";


export default function Home() {
  return  <Flex className={cn("container flex-col justify-between h-full")}>
    <div className=" pt-[6vh]">
      <Image src="/images/logo.png" className="aspect-[51/71] w-[51px]" />
      <Typography className="mt-4 text-[1.5rem] leading-7 font-bold">Hola!</Typography>
      <Typography className="mt-2 text-[1rem] leading-7 text-black/80">Welcome to TON Farms</Typography>
      <Typography className="mt-6 text-[0.875rem] leading-[1.125rem] font-medium text-black/60">Pre-register now to get your first-come-first-served bonus, and share your referral code with your friends now.</Typography>
    </div>
    <div className="pb-5 py-3">
      <NavLink to={generateClaimUrl()}>
        <Button size="xl" color="secondary" className="w-full">Pre-Register</Button>
      </NavLink>
    </div>
  </Flex>
}
