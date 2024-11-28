import Button from "@/components/atoms/Button";
import Flex from "@/components/atoms/Flex";
import Image from "@/components/atoms/Image";
import Typography from "@/components/atoms/Typography";
import { useAuth } from "@/libs/auth/Provider";
import { formatToken } from "@/utils/number";

export default function Balance() {
  const auth = useAuth()
  return (
    <div className="">
      <Typography size={'titleLg'}>Balance</Typography>
      <div className="mt-[1.125rem] bg-content rounded-xl border border-content-600 p-3">
        <Flex className="items-center justify-between">
          <Flex className="items-center">
            <Image className="w-7" src="/assets/token.webp" />
            <Typography className="ml-3 text-[1.325rem] leading-[1.75rem] text-[#EF0739] font-semibold">
              {formatToken(auth.userInfo?.coin)}
            </Typography>
            <Typography size={'sm'} className="text-[#172533] pt-2 pl-1">TFC</Typography>
          </Flex>
          <Button className="bg-[#1725331A] text-[#17253380] rounded-full relative" size="md">
            <div className="absolute inset-x-[10%] -top-2">
              <Image src="/images/coming-soon.webp" className="w-full aspect-[71/10]"/>
            </div>
            <span>Withdraw</span>
          </Button>
        </Flex>
        <Flex className="mt-5 items-center justify-between">
          <Flex className="items-center">
            <Image className="w-7" src="/images/ton-token.webp" />
            <Typography className="ml-3 text-[1.325rem] leading-[1.75rem] text-[#1492D0] font-semibold">
              {auth.userInfo?.ton_deposit}
            </Typography>
            <Typography size={'sm'} className="text-[#172533] pt-2 pl-1">TON</Typography>
          </Flex>
          <Button className="rounded-full relative" size="md" color="secondary">
            <span>Withdraw</span>
          </Button>
        </Flex>
      </div>
    </div>
  )
}
