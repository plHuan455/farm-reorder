import Button from "@/components/atoms/Button"
import Flex from "@/components/atoms/Flex"
import IconBack from "@/components/atoms/icons/back"
import Typography from "@/components/atoms/Typography"
import { useNavigate } from "react-router-dom"

interface Props {
  title: string
}
export default function Header({title}: Props) {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 inset-x-0 z-header">
      <div className="container h-[--h-header] pt-4">
        <Flex className="h-full items-center relative justify-center">
          <Typography size={'lg'} className="font-bold">{title}</Typography>
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Button isIconOnly size="lg" color="secondary" className="bg-black/20 text-black"
              onClick={() => navigate('/')}
            ><IconBack className="text-[1.5em]" 
              
            /></Button>
          </div>
        </Flex>
      </div>
    </div>
  )
}
