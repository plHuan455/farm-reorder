import Flex from '@/components/atoms/Flex'
import Image from '@/components/atoms/Image'
import Typography from '@/components/atoms/Typography'
import { cn } from '@/utils/className'

export default function TodayReward() {
  const data = [
    {label: 'Stars', value: 5, icon: <Image src='/images/star.webp' />},
    {label: 'Ton', value: 1, icon: <Image src={'/images/ton-token.webp'} className='' />, className: 'text-[#1492D0]', },
    {label: 'Stars', value: 5, icon: <Image src='/images/energy.webp' />},
  ]
  return (
    <div className='bg-content rounded-xl border border-content-600'>
      <Flex className='py-3.5 px-4 justify-evenly'>
        {data.map((value, index) => <div key={index}>
          <Flex className='flex-col items-center'>
            <Flex center className='h-9 [&_img]:h-full'>
              {value.icon}
            </Flex>
            <Typography size={'titleMd'} className={cn('mt-2', value.className)}>
              {value.value}
            </Typography>
            <Typography className='mt-1 text-foreground-400' size={'md'}>
              {value.label}
            </Typography>
          </Flex>
        </div>)}
      </Flex>
    </div>
  )
}
