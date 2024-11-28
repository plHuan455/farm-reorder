import Flex from "@/components/atoms/Flex"
import Typography from "@/components/atoms/Typography"
import { useAuth } from "@/libs/auth/Provider"
import { cn } from "@/utils/className"

interface Props {
  className?: string
}


export default function Energy({className}: Props) {
  const {userInfo} = useAuth()
  return (
    <Flex className={cn("gap-1 items-center", className)}>
      <img src="/images/energy.webp" alt="energy" className="w-[1.375rem]" />
      <Typography font={'content'} size={'md'}>
        {userInfo?.energy ?? 0} / 10
      </Typography>
    </Flex>
  )
}
