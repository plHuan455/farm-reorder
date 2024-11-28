import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import MainLayout from "@/layouts/main"
import AuthProvider from "@/libs/auth/Provider"
import OnlyBottomBar from "@/layouts/OnlyBottombar"
import { generateDailyRewardUrl } from "./DailyReward/common"
import DailyReward from "./DailyReward"
import Empty from "@/layouts/Empty"
import { generateClanUrl } from "./Clan/common"
import Clan from "./Clan"
import { generateAirdropUrl } from "./Airdrop/common"
import Airdrop from "./Airdrop"
import Shop from "./Shop"
import { generateShopUrl } from "./Shop/common"
import { generateProfileUrl } from "./Profile/common"
import Profile from "./Profile"

export default function Routing() {
  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <OnlyBottomBar />,
          children: [
            {path: '/quest', element: <div>quest</div>},
            {path: generateAirdropUrl(), element: <Airdrop />},
          ]
        },
        {
          element: <Empty />,
          children: [
            {path: generateDailyRewardUrl(), element: <DailyReward />},
            {path: generateClanUrl(), element: <Clan />},
            {path: generateShopUrl(), element: <Shop />},
            {path: generateProfileUrl(), element: <Profile />}
          ]
        },
        {
          element: <MainLayout />,
          children: [
            {path: '/', element: <Home />},
          ]
        }
      ]
    },
  ])
  return (  
    <RouterProvider router={router} />
  )
}
