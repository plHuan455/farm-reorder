import Avatar from "@/components/atoms/Avatar";
import Typography from "@/components/atoms/Typography";
import { useAuth } from "@/libs/auth/Provider";

export default function Info() {
  const auth = useAuth()
  return (
    <div
      className="relative bg-white/80 rounded-lg"
      style={{
        // backgroundImage: 'url("/images/name-bar.png")'
      }}
    >
      {/* <img src="/images/name-bar.png" className="absolute left-0 w-full h-full" /> */}
      <div className="flex items-center gap-2 relative py-2 pl-2 pr-3">
        <div className="w-[38px] shrink-0">
          <Avatar src={auth.userInfo?.avatar ?? ""}/>
        </div>
        <div>
          <Typography size={'md'} className="font-bold">
            @{auth.userInfo?.username}
          </Typography>
          <Typography className="mt-1 text-[#F16382] font-semibold" size={'sm'}>
            Level: 2
          </Typography>
        </div>
      </div>
    </div>
  )
}
