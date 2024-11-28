import Avatar from "@/components/atoms/Avatar"
import Flex from "@/components/atoms/Flex"
import Image from "@/components/atoms/Image"
import Typography from "@/components/atoms/Typography"
import QUERY_KEYS from "@/libs/react-query/constants"
import { listClanMemberService } from "@/services/clan"
import { abbreviateNumber } from "@/utils/number"
import { useQuery } from "react-query"

interface Props {
  clanId: number
}
export default function Members({clanId}: Props) {
  const {data: memberData} = useQuery({queryKey: QUERY_KEYS.CLAN.listMember, queryFn: () => listClanMemberService({clanId: clanId}), enabled: Boolean(clanId)})
  return (
    <div>
      {memberData?.users.map((member, index) => <div key={index} className="mt-4 first:mt-0">
      <Flex className="gap-3 items-center p-4 rounded-xl bg-content2">
          <div className="shrink-0">
            <Avatar src={member.avatar} className="w-[54px]" />
          </div>
          <div className="grow">
            <Typography size={'titleMd'}>
              {member.username}
            </Typography>
            <Flex className="mt-2 text-foreground-400 items-center gap-4">
              <Flex className="items-center gap-2">
                <Image src="/images/ton-token.webp" className="w-[1rem] aspect-square"/>
                <Typography size={'sm'}>{abbreviateNumber(123123)}</Typography>
              </Flex>
              <Flex className="items-center gap-2">
                <Image src="/assets/token.webp" className="w-[1rem] shrink-0" />
                <Typography size={'sm'}>{abbreviateNumber(123123)}</Typography>
              </Flex>
            </Flex>
          </div>  

          <div className="shrink-0">
            <div className="w-[1.625rem]">
              {index < 3 && <Image src={index === 0 ? "/images/vang.png": index === 1 ? "/images/bac.png" : index === 2 ? "/images/dong.png" : ""} className="w-full"/>}
            </div>
          </div>
        </Flex>
      </div>)}
    </div>
  )
}
