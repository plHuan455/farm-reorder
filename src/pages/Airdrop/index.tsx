import Button from "@/components/atoms/Button";
import Flex from "@/components/atoms/Flex";
import IconWallet from "@/components/atoms/icons/wallet";
import Typography from "@/components/atoms/Typography";

export default function Airdrop() {
  return (
    <div className="container h-full">
      <Flex className="pt-[10vh] flex-col h-full">
        <div className="grow">
          <Typography size={'titleLg'}>Get real crypto.</Typography>
          <Typography size={'lg'} className="text-foreground-400 mt-2">Earn and buy any tokens.</Typography>

          <Button size="xl" color="secondary" className="mt-10 w-full">
            <IconWallet /> <span>Connect Wallet</span>
          </Button>
        </div>
        <Flex center className="py-5">
          <Button color="secondary" size="md" className="h-11 rounded-full border border-foreground-400 bg-transparent text-foreground-400 w-[80%]">
          View TGE Roadmap
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}
