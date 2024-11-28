import Flex from "@/components/atoms/Flex"
import Typography from "@/components/atoms/Typography"

interface Props {
  title: string
  img: React.ReactNode
}
export default function PageTitle({img, title}: Props) {
  return (
    <div className="pb-5 pt-[5vh]">
      <Flex className="items-center flex-col">
        <div className="h-[5.875rem] [&>img]:h-full">
          {img}
        </div>
        <Typography size={'titleXl'} className="text-center mt-6">
          {title}
        </Typography>
      </Flex>
    </div>
  )
}
