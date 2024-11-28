import Flex from '@/components/atoms/Flex'
import Image from '@/components/atoms/Image'
import Typography from '@/components/atoms/Typography'
import { IShopItem } from '@/services/shop/types'
import { cn } from '@/utils/className'

interface Props extends IShopItem{
  titleClassName?: string
  img: React.ReactNode
  content: string
  className?: string
}
export default function ShopItem({price, titleClassName, content, img, className}: Props) {
  return (
    <div className={className}>
      <Flex className='flex-col aspect-[150/139] rounded-2xl border border-[currentColor] overflow-hidden bg-content'>
        <Flex center className='grow flex-col gap-2'>{img}
          <Typography className='text-[currentColor] font-bold' size={'md'}>{content}</Typography>
        </Flex>

        <Flex center className={cn('bg-[currentColor] py-2 items-center gap-2', titleClassName)}>
          <Image src='/images/ton-token.webp' className='w-4'/>
          <Typography size={'titleSm'} className='text-white'>
            {price} TON
          </Typography>
        </Flex>
      </Flex>
    </div>
  )
}
