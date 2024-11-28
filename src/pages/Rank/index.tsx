import Avatar from "@/components/atoms/Avatar";
import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { useAuth } from "@/libs/auth/Provider";
import QUERY_KEYS from "@/libs/react-query/constants";
import { listReorderPlayerService } from "@/services/reopen";
import dayjs from "dayjs";
import { useQuery } from "react-query";

export default function Rank() {
  const auth = useAuth()
  const { data } = useQuery({ queryKey: [QUERY_KEYS.USER.reorder], queryFn: () => listReorderPlayerService() })
  return (
    <Flex className="h-full container pt-[3vh] flex-col">
      <div>
        <Flex className="flex-col items-center">
          <Image src="/images/cup.webp" className="w-[109px] shrink-0" />
          <Typography className="text-center font-bold text-[1.5rem] leading-7 mt-3">3000 TON Reward</Typography>
        </Flex>

        <Flex className="mt-7 rounded-lg bg-content p-3.5 gap-2 items-center">
              <div className="shrink-0">
                <Avatar src={auth.userInfo?.avatar} className="w-10" />
              </div>
              <div className="grow min-w-0">
                <Typography className="text-[1rem] leading-5 line-clamp-1 text-black font-bold">
                  {auth.userInfo?.username}
                </Typography>
                <Typography className="text-[0.75rem] leading-4 text-black/70 mt-2">
                  {dayjs(auth.userInfo?.created_at).format('DD MMM, hh:mm')}
                </Typography>
              </div>

              <div>
                <Typography className="text-[0.875rem] leading-4 font-medium">#{auth.userInfo?.order}</Typography>
              </div>
            </Flex>
      </div>
      <Flex className="items-center mt-7 pb-2 justify-between">
        <Typography className="text-[1rem] leading-5 font-bold">
          List users
        </Typography>
        <Typography className="text-[0.75rem] leading-4 text-[#172533CC]">{data?.total_count ?? 0} users</Typography>
      </Flex>
      <div className="grow overflow-auto scrollbar pb-5">
        <div>
          {data?.users.map(value => (<div key={value.safe_id} className="mt-2.5 first:mt-0">
            <Flex className="rounded-lg bg-content2 p-3.5 gap-2 items-center">
              <div className="shrink-0">
                <Avatar src={value.avatar} className="w-10" />
              </div>
              <div className="grow min-w-0">
                <Typography className="text-[1rem] leading-5 line-clamp-1 text-black font-bold">
                  {value.username}
                </Typography>
                <Typography className="text-[0.75rem] leading-4 text-black/70 mt-2">
                  {dayjs(value.created_at).format('DD MMM, hh:mm')}
                </Typography>
              </div>

              <div>
                <Typography className="text-[0.875rem] leading-4 font-medium">#{value.order}</Typography>
              </div>
            </Flex>
          </div>))}
        </div>
      </div>

    </Flex>
  )
}
