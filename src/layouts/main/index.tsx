import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Outlet />
    </div>
  )
}
