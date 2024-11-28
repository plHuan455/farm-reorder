import Image from "@/components/atoms/Image";
import PageTitle from "@/components/organisms/PageTitle";
import TodayReward from "./TodayReward";
import Days from "./Days";
import Button from "@/components/atoms/Button";


interface Props {
  onContinue?: () => void
}
export default function DailyReward({onContinue}: Props) {
  return (
    <div className="container overflow-auto h-full pb-5">
      <PageTitle 
        img={<Image src="/images/daily.webp" className="aspect-[75/94]"/>}
        title="Your daily rewards"
      />
      <TodayReward />
      <Days className="mt-5" />
      <Button color="secondary" size="xl" className="w-full mt-6" onClick={onContinue}>
        Continue
      </Button>
    </div>
  )
}
