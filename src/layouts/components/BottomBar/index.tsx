import IconFire from "@/components/atoms/icons/fire"
import IconFrend from "@/components/atoms/icons/frend"
import IconHome from "@/components/atoms/icons/home"
import IconLightning from "@/components/atoms/icons/lightning"
import Typography from "@/components/atoms/Typography"
import { generateAirdropUrl } from "@/pages/Airdrop/common"
import { cn } from "@/utils/className"
import { useLocation, useNavigate } from "react-router-dom"

export default function BottomBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const menus = [
    { label: 'Home', icon: <IconHome />, href: '/'},
    { label: 'Task', icon: <IconFire />, href: '/task'},
    { label: 'Ranking', icon: <IconLightning />, href: '/rank'},
    { label: 'Frens', icon: <IconFrend />},
    { label: 'Airdrop',  href: generateAirdropUrl(), icon: <img src="/images/TFC.webp" className="w-[19px] aspect-square block"/>},
  ]
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-xl">
      <div className="grid grid-cols-5 h-[4rem] pt-[1%]">
        {menus.map(value => <div className={cn("flex items-center flex-col justify-center h-full gap-1 text-foreground-400", location.pathname === value.href && "text-foreground")} key={value.label}
          onClick={() => {
            value.href && navigate(value.href)
          }}
        >
          {value.icon}
          <Typography size={'sm'} className="font-medium">{value.label}</Typography>
        </div>)}
      </div>
    </div>
  )
}
