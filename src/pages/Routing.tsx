import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Home"
import MainLayout from "@/layouts/main"
import AuthProvider from "@/libs/auth/Provider"
import Claim from "./Claim"
import { generateClaimUrl } from "./Claim/common"
import { generateRankUrl } from "./Rank/common"
import Rank from "./Rank"
import Error from "./Error"

export default function Routing() {
  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {path: '/', element: <Home />},
            {path: generateRankUrl(), element: <Rank />},
            {path: generateClaimUrl(), element: <Claim />},
            {path: '/error', element: <Error />},
          ]
        }
      ]
    },
  ])
  return (  
    <RouterProvider router={router} />
  )
}
