import Header from "@/components/templates/Header";
import { useAuth } from "@/libs/auth/Provider";
import Banner from "./Banner";
import Balance from "./Balance";
import Services from "./Services";
import Clan from "./Clan";

export default function Profile() {
  const auth = useAuth()
  return (
    <div className="h-full">
      <Header 
        title={`@${auth.userInfo?.username ?? ""}`}
      />
      <div className="pt-[--h-header] rounded-b-2xl"
      style={{
        background: 'linear-gradient(to right, #BB65A8, #7C88FE)'
      }}
      >
        <Banner />
      </div>
      <div className="mt-4 container">
        <Balance />
        <Clan />
        <Services />
      </div>
    </div>
  )
}
