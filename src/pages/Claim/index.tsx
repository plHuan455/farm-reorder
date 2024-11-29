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
import { useEffect, useState } from "react";
import IconTon from "@/components/atoms/icons/ton";
import confetti from "canvas-confetti"

export default function Claim() {
  const [copyNotify, setCopyNotify] = useState<boolean>(false)
  const auth = useAuth()
  const order = auth.userInfo?.order ?? 3012
  const isCanGetTon = order <= 3000

  const handleCopy = () => {
    setCopyNotify(true)
    setTimeout(() => {
      setCopyNotify(false)
    }, 2000)
    copyClipboard(auth.userInfo?.safe_id as string)
  }


  useEffect(() => {
      let fireCount = 2
      const handleFirework = () => {
        const pumpkin = confetti.shapeFromPath({
          path: "M449.4 142c-5 0-10 .3-15 1a183 183 0 0 0-66.9-19.1V87.5a17.5 17.5 0 1 0-35 0v36.4a183 183 0 0 0-67 19c-4.9-.6-9.9-1-14.8-1C170.3 142 105 219.6 105 315s65.3 173 145.7 173c5 0 10-.3 14.8-1a184.7 184.7 0 0 0 169 0c4.9.7 9.9 1 14.9 1 80.3 0 145.6-77.6 145.6-173s-65.3-173-145.7-173zm-220 138 27.4-40.4a11.6 11.6 0 0 1 16.4-2.7l54.7 40.3a11.3 11.3 0 0 1-7 20.3H239a11.3 11.3 0 0 1-9.6-17.5zM444 383.8l-43.7 17.5a17.7 17.7 0 0 1-13 0l-37.3-15-37.2 15a17.8 17.8 0 0 1-13 0L256 383.8a17.5 17.5 0 0 1 13-32.6l37.3 15 37.2-15c4.2-1.6 8.8-1.6 13 0l37.3 15 37.2-15a17.5 17.5 0 0 1 13 32.6zm17-86.3h-82a11.3 11.3 0 0 1-6.9-20.4l54.7-40.3a11.6 11.6 0 0 1 16.4 2.8l27.4 40.4a11.3 11.3 0 0 1-9.6 17.5z",
          matrix: [0.020491803278688523, 0, 0, 0.020491803278688523, -7.172131147540983, -5.9016393442622945],
        })
        const tree = confetti.shapeFromPath({
          path: "M120 240c-41,14 -91,18 -120,1 29,-10 57,-22 81,-40 -18,2 -37,3 -55,-3 25,-14 48,-30 66,-51 -11,5 -26,8 -45,7 20,-14 40,-30 57,-49 -13,1 -26,2 -38,-1 18,-11 35,-25 51,-43 -13,3 -24,5 -35,6 21,-19 40,-41 53,-67 14,26 32,48 54,67 -11,-1 -23,-3 -35,-6 15,18 32,32 51,43 -13,3 -26,2 -38,1 17,19 36,35 56,49 -19,1 -33,-2 -45,-7 19,21 42,37 67,51 -19,6 -37,5 -56,3 25,18 53,30 82,40 -30,17 -79,13 -120,-1l0 41 -31 0 0 -41z",
          matrix: [0.03597122302158273, 0, 0, 0.03597122302158273, -4.856115107913669, -5.071942446043165],
        })
        const heart = confetti.shapeFromPath({
          path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
          matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333],
        })

        const defaults = {
          scalar: 2,
          spread: 180,
          particleCount: 30,
          origin: { y: -0.1 },
          startVelocity: -35,
        }

        confetti({
          ...defaults,
          shapes: [pumpkin],
          colors: ["#ff9a00", "#ff7400", "#ff4d00"],
        })
        confetti({
          ...defaults,
          shapes: [tree],
          colors: ["#8d960f", "#be0f10", "#445404"],
        })
        confetti({
          ...defaults,
          shapes: [heart],
          colors: ["#f93963", "#a10864", "#ee0b93"],
        })
        fireCount -= 1
      }

      const interval = setInterval(() => {
        if (fireCount > 0) {
          handleFirework()
        } else {
          clearInterval(interval)
        }
      }, 500)

      return () => {
        clearInterval(interval)
      }
  }, [])

  return (
    <div className="h-full pt-[2vh] relative overflow-auto flex flex-col">
      <Image src="/images/fireward.webp" className="absolute top-0 inset-x-0 z-[-1] opacity-40"/>
      <div className="container grow">
        <Typography className="mt-4 text-[1.5rem] leading-7 font-bold">You are amazing!</Typography>
        <Typography className="mt-2 text-[1rem] leading-7 text-black/80">{isCanGetTon ? "Congrats, you’ve earned $TON for the first members" : <span>Congrats on registering for position {order}/3000</span>}</Typography>
        <Flex className="mt-8 flex-col items-center gap-4">
          <IconTon className={cn("text-[4.4375rem]", isCanGetTon ? "text-[#0088CC]" : "text-black/20")} />
          {/* <Image src="/images/ton.svg" className={cn("w-[4.4375rem] aspect-square", "grayscale")} /> */}
          <Typography font={'bigNumber'} className={cn("text-center font-semibold text-[2.625rem]", !isCanGetTon && "text-[#CCCCCC] line-through")}>
            <span className={cn(!isCanGetTon && "text-[#CCCCCC]")}>{isCanGetTon ? 1 : 3000}</span><span className={cn("text-[#0088CC]", !isCanGetTon && "text-[#CCCCCC]")}>TON</span>
          </Typography>
        </Flex>
        <Flex className="mt-7 bg-[#1725331A] items-center py-3 rounded-xl px-3 pr-10 relative">
          <Flex center className="grow min-w-0">
            <Typography className="text-[1rem] font-bold tracking-[5px]">{auth.userInfo?.safe_id}</Typography>
          </Flex>
          <Button className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 h-8 text-[0.75rem]" size="md" color="secondary" onClick={() => {
            handleCopy()
          }}>
            {copyNotify ? 'COPIED' : 'COPY'}
          </Button>
        </Flex>

        <div className="mt-7">
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
          <Button isIconOnly size="xl" color="secondary" className="bg-transparent border border-black/80 text-black hover:bg-black/10" >
            <IconRank className="!text-[1.5em]" />
          </Button>
        </NavLink>
      </Flex>
    </div>
  )
}
