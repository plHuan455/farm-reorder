import Flex from "@/components/atoms/Flex"
import IconMember from "@/components/atoms/icons/member/idnex"
import Image from "@/components/atoms/Image"
import Typography from "@/components/atoms/Typography"
import QUERY_KEYS from "@/libs/react-query/constants"
import { listClanService } from "@/services/clan"
import { cn } from "@/utils/className"
import { abbreviateNumber } from "@/utils/number"
import { useQuery } from "react-query"

interface Props {
  className?: string
}
export default function TopClan({className}: Props) {
  const {data: clanData} = useQuery({queryKey: QUERY_KEYS.CLAN.top, queryFn: () => listClanService({})})
  return (
    <div className={cn("container", className)}>
      {clanData?.clans.map((value, index) => <div key={value.id} className="mt-3 first:mt-0">
        <Flex className="gap-3 items-center p-4 rounded-xl bg-content2">
          <div className="shrink-0">
            <Image src={'/images/clan-wooden.webp'} className="w-[3.25rem] aspect-[3/4]"></Image>
          </div>
          <div className="grow">
            <Typography size={'titleMd'}>
              {value.name}
            </Typography>
            <Flex className="mt-2 text-foreground-400 items-center gap-4">
              <Flex className="items-center gap-2">
                <IconMember className="text-black"/>
                <Typography size={'sm'}>{abbreviateNumber(value.total_member)}</Typography>
              </Flex>
              <Flex className="items-center gap-2">
                <Image src="/assets/token.webp" className="w-[1rem] shrink-0" />
                <Typography size={'sm'}>{abbreviateNumber(value.total_coin)}</Typography>
              </Flex>
            </Flex>
          </div>  

          <div className="shrink-0">
            <div className="w-[1.625rem]">
            {index < 3 && <Image src={index === 0 ? "/images/vang.png": ""} className="w-full"/>}
            </div>
          </div>
        </Flex>
      </div>)}
    </div>
  )
}
