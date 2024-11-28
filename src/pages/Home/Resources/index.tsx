import Flex from "@/components/atoms/Flex";
import IconWallet from "@/components/atoms/icons/wallet";
import Typography from "@/components/atoms/Typography";

export default function Resources() {
  return (
    <div className="bg-white/80 rounded-lg p-2 pl-4">
      <Flex className="items-center gap-2.5">

        <Flex className="items-center gap-2">
          <img src="/images/star.webp" alt="ton" className="w-[1.375rem] aspect-square" />
          <Typography font={'content'} className="font-bold">
            63
          </Typography>
        </Flex>
        <Flex className="items-center gap-2">
          <img src="/images/ton-token.webp" alt="ton" className="w-[1.375rem] aspect-square" />
          <Typography font={'content'} className="font-bold">
            9
          </Typography>
        </Flex>
        <div className="py-[0.625rem] px-3 bg-[#172533] rounded-lg">
          <IconWallet className="text-white" />
        </div>
      </Flex>
    </div>
  )
}
