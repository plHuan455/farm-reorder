import Button from "@/components/atoms/Button";
import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { useAuth } from "@/libs/auth/Provider";
import { cn } from "@/utils/className";
import queryString from 'query-string'
import ENVS from "@/constants/envs";
import { copyClipboard } from "@/utils/common";
import WebApp from "@twa-dev/sdk";
import IconRank from "@/components/atoms/icons/rank";
import { NavLink } from "react-router-dom";
import { generateRankUrl } from "../Rank/common";

export default function Claim() {
  const auth = useAuth()
  const order = auth.userInfo?.order ?? 3012
  const isCanGetTon = order <= 3000
  return (
    <div className="h-full pt-[4vh] relative overflow-auto">
      <div className="container">
      <Typography className="mt-4 text-[1.5rem] leading-7 font-bold">You are amazing!</Typography>
      <Typography className="mt-2 text-[1rem] leading-7 text-black/80">{isCanGetTon ? "Congrats, you’ve earned $TON for the first members": <span>Congrats on registering for position {order}/3000</span>}</Typography>
      <Flex className="mt-8 flex-col items-center gap-4">
         <Image src="/images/ton.svg" className="w-[4.4375rem] aspect-square" />
         <Typography font={'bigNumber'} className={cn("text-center font-semibold text-[2.625rem]", !isCanGetTon && "text-[#CCCCCC] line-through")}>
          <span className={cn(!isCanGetTon && "text-[#CCCCCC]")}>{isCanGetTon ? 1 : 3000}</span><span className={cn("text-[#0088CC]", !isCanGetTon && "text-[#CCCCCC]")}>TON</span>
         </Typography>
      </Flex>
      <Flex className="mt-7 bg-[#1725331A] items-center py-3 rounded-xl px-3">
        <Flex center className="grow min-w-0">
          <Typography className="text-[1rem] font-bold tracking-[5px]">{auth.userInfo?.safe_id}</Typography>
        </Flex>
        <Button className="shrink-0 h-8 text-[0.75rem]" size="md" color="secondary" onClick={() => {
          copyClipboard(auth.userInfo?.safe_id as string)
        }}>
          COPY
        </Button>
      </Flex>

      <div className="mt-11">
        <Typography className="text-[0.875rem] leading-[1.125rem] font-bold">
          When game release
        </Typography>
        <ul className="pl-3 pb-3 mt-[1.125rem] list-disc">
          <li className="text-[0.75rem] leading-[1.125rem] text-[#172533B2]">Share to Get <strong className="text-[#FF6A00]">10% TON</strong> when your referral IAP + <strong className="text-[#FF6A00]">up to 50% TON</strong> when you are a owner Clan </li>
          <li className="mt-3 text-[0.75rem] leading-[1.125rem] text-[#172533B2]">Withdraw $TON </li>
        </ul>
      </div>
      </div>
      
      <Flex className="pb-5 pt-3 sticky bottom-0 bg-background container items-center gap-3">
        <Button size="xl" color="secondary" className="w-full"
          onClick={() => {
            const url = queryString.stringifyUrl({
              url: "https://t.me/share/url",
              query: {
                url: queryString.stringifyUrl({
                  url: ENVS.TELEGRAM_APP as string,
                  query: { start: `r_${auth.userInfo?.safe_id}` },
                }),
                text: `Pre-register now to get your first-come-first-served bonus, and share your referral code with your friends now.`,
              },
            })
            console.log("🚀 ~ Claim ~ url:", url)
            WebApp.openTelegramLink(url)
          }}
        >
          Share now
        </Button>
        <NavLink to={generateRankUrl()}>
          <Button isIconOnly size="xl" color="secondary" className="bg-transparent border border-black/80 text-black" >
            <IconRank className="!text-[1.5em]"/>
          </Button>
        </NavLink>
      </Flex>
    </div>
  )
}
