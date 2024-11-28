import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import ENVS from "@/constants/envs";
import { ILevel } from "@/services/clan/types";
import { formatToken } from "@/utils/number";
import { useEffect, useMemo } from "react";
import Members from "./Members";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/libs/react-query/constants";
import { getMyClanService } from "@/services/clan";

interface Props {
  levels: ILevel[]
  onChangeColor: (color: string) => void
}
export default function MyClan({ levels, onChangeColor }: Props) {
  const {data: myClanData} = useQuery({
    queryKey: [QUERY_KEYS.CLAN.getMyClan],
    queryFn: () => getMyClanService()
  })
  const clan = myClanData?.clan
  // const clan = {
  //   name: 'Anh em SG',
  //   total_token: 3523432,
  //   member: 769,
  //   member_farming: '+7%',
  //   owner: '30% IAP',
  //   level: 2,
  // }

  const level = useMemo(() => {
    if(!clan) return undefined
    return levels.find(value => value.level === clan.level)
  }, [levels, clan])

  useEffect(() => {
    if(!level) return
    onChangeColor(level.color)
  }, [])

  if (!level || !clan) return null
  return (
    <div className="h-full relative flex flex-col container">
      <div className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: level.color
        }}
      >
        <Flex className="items-center">
          <div className="shrink w-[36%] h-full">
            <Image src={level.avatar} alt={level.name} className="aspect-[102/149] w-full" />
          </div>
          <div className="grow min-w-0 pl-4">
            <Flex className="flex-col ">
              <Typography size={'titleLg'}
              >
                {clan?.name}
              </Typography>
              <Flex className="mt-2 items-center gap-2">
                <div className="shrink-0">
                  <Image src="/assets/token.webp" className="w-4 aspect-square" />
                </div>
                <Typography size={'md'} className="font-semibold">
                  {formatToken(clan?.total_coin)}
                </Typography>
                <Typography size={'sm'} className="text-[#172533CC]">{ENVS.TOKEN}</Typography>
              </Flex>
              <div className="text-[#172533CC] mt-3 flex flex-col gap-2">
                <Typography size={'sm'} className="">
                  Owner: {level.bonus_ton}% IAP
                </Typography>
                <Typography size={'sm'} className="">
                  Members: +{level.bonus_farming}% farming
                </Typography>
                <Typography size={'sm'} className="">
                  Total member: {clan.total_member}
                </Typography>
              </div>
            </Flex>
          </div>
        </Flex>
      </div>
      <div className="mt-4 grow relative mb-5">
        <div className="absolute inset-0 overflow-auto scrollbar">
          <Members clanId={clan.id}/>
        </div>
      </div>
    </div>
  )
}
